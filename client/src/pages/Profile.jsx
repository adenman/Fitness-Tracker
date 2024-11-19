import {  useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SIGN_OUT } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {GET_USER_BY_ID } from "../utils/queries";
import {UPDATE_USER } from "../utils/mutations";
import Auth from '../utils/auth';
import DragDrop from '../components/DragDrop';


export default function Profile({ onLogout }) {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId: userId },
  });
  const navigate = useNavigate();
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPfp, setIsEditingPfp] = useState(false);
  const [newName, setNewName] = useState(data?.oneUser?.userName || '');
  const [newPassword, setNewPassword] = useState(null);
  const [newPfp, setNewPfp] = useState(null);
  const [showDragDrop, setShowDragDrop] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  
  const [updateUser] = useMutation(UPDATE_USER);
    

  const [signOut] = useMutation(SIGN_OUT, {
    onCompleted: () => {      
      onLogout(); 
    },
    onError: (err) => {
      console.error("Logout error:", err);
    },
  });
  
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };
  const handleEditPfpClick = () => {
    setIsEditingPfp(true);
  };

  const handleEditPasswordClick = () => {
    setIsEditingPassword(true);
  };
  
  const handleEditNameClick = () => {
    setIsEditingName(true);
  };

  
  const handleFileChange = async (file) => {
    try {
      const profile = Auth.getProfile();
      const userId = profile.data._id;
  
      // Compress and optimize image
      const optimizeImage = async (base64Str, maxWidth = 800, maxHeight = 800) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = base64Str;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
  
            // Resize logic
            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }
  
            canvas.width = width;
            canvas.height = height;
  
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
  
            // Use lower quality and smaller size
            const optimizedBase64 = canvas.toDataURL('image/webp', 0.5);
            resolve(optimizedBase64);
          };
        });
      };
  
      const optimizedImage = file.base64 
        ? await optimizeImage(file.base64) 
        : null;
  
      updateUser({
        variables: {
          userId: userId,
          pfp: optimizedImage // Optimized, compressed image
        }
      });
      setIsEditingPfp(false);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  






  const handleSaveEdit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    if (!Auth.loggedIn()) {
      return;
    }

    if (newPassword && newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    const profile = Auth.getProfile();
    const userId = profile.data._id;
  
    try {
      const updateResponse = await updateUser({
        variables: {
          userId: userId,
          userName: newName,
          password: newPassword, 
          
        }
      });
  
      // Optional: Add success feedback or navigation
      setIsEditingPassword(false);
      setIsEditingName(false);
    } catch (err) {
      console.error("Error updating profile:", err.message);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching profile: {error.message}</p>;

  

  return (
    <div>
      {/* pfp and userName */}
      <h1 className="flex justify-center mb-8">Hello {data.oneUser.userName}!</h1>
      <div className="flex justify-center">
      <button onClick={() => {
        handleEditPfpClick();
        setShowDragDrop(true);
      }}>
          <div className="profilepic">
            {/* Use newPfp if available, otherwise use existing profile picture */}
            <img 
              className="profilepic__image" 
              src={newPfp || data.oneUser.pfp} 
              alt="Profile" 
            />
            <div className="profilepic__content">
              <span className="profilepic__text">Edit Profile Picture</span>
            </div>
          </div>
        </button> 
      </div>
      <div className="flex justify-center">
        
      {isEditingPfp ? (
        <div className="flex justify-center">
          {showDragDrop && (
      <DragDrop
        showPreview={false}
        onFileChange={(fileInfo) => {
          if (fileInfo && fileInfo.base64) {
            setNewPfp(fileInfo.base64);
            handleFileChange(fileInfo);
          }
        }}
        onCancel={() => {
          setShowDragDrop(false);
          setIsEditingPfp(false);
          setNewPfp(null);
          setFileInfo(null);
        }}
      />
    )}
 </div>


      
      ) : (
      <div></div>
      )}
        
        
      </div>

      

      <div className="border-3 accent mt-6">
      {isEditingName ? (
  <div className="w-full px-4 mt-6">
    <form 
      className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto" 
      onSubmit={handleSaveEdit}
    >
      <div className="mb-4">
        <input 
          type="text" 
          className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New Username" 
          value={data.oneUser.userName} 
          onChange={(e) => setNewName(e.target.value)} 
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="flex justify-between space-x-2">
        <button 
          type="submit" 
          className="flex-1 bg-blue-500 text-black py-2 rounded-md hover:bg-blue-600 transition"
        >
          Update
        </button>
        <button 
          type="button"
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition"
          onClick={() => {setIsEditingName(false)}}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
) : (
  <div className="flex justify-between items-center px-4 py-3 test shadow-sm">
    <span className="text-lg">Username: {data.oneUser.userName}</span>
    <button 
      onClick={handleEditNameClick} 
      className="accent text-black px-3 py-1 rounded-md text-sm"
    >
      Edit
    </button>
  </div>
)}

{isEditingPassword ? (
  <div className="w-full px-4 mt-6">
    <form 
      className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto" 
      onSubmit={handleSaveEdit}
    >
      <div className="mb-4">
        <input 
          type="password" 
          className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New Password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="flex justify-between space-x-2">
        <button 
          type="submit" 
          className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Update
        </button>
        <button 
          type="button"
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition"
          onClick={() => {setIsEditingPassword(false)}}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
) : (
  <div className="flex justify-between items-center px-4 py-3 test shadow-sm">
    <span className="text-lg">Password: ********</span>
    <button 
      onClick={handleEditPasswordClick} 
      className="accent text-black px-3 py-1 rounded-md text-sm"
    >
      Edit
    </button>
  </div>
)}
        
        
      </div>
      <div className="flex justify-center mt-10">
        <button onClick={()=> navigate(`/Log`)} className="py-6 px-24 mt-6 test border-2 accentb">Log</button>
      </div>

      <div>
        <h1 className="flex justify-center mt-4">Your Progress</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-5 mt-6 p-2 border-2 accentb darkbg">
  {data.oneUser.completedRegiments.map((regiment, index) => (
    <div className="flex justify-center" key={index}>
      {regiment.progressPic && (
        <img
          src={regiment.progressPic}
          alt={`Progress pic for ${regiment.name}`}
          className="w-full max-w-[300px] h-auto object-cover rounded-lg"
        />
      )}
    </div>
  ))}
</div>
      </div>
    </div>
  );
}
