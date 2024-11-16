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
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(data?.oneUser?.userName || '');
  const [newPassword, setNewPassword] = useState(null);
  const [newPfp, setNewPfp] = useState(null);
  const [showDragDrop, setShowDragDrop] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      // Update the local state with the new profile picture
      setNewPfp(data)
      setShowDragDrop(false);
    },
    onError: (error) => {
      console.error("Error updating profile picture:", error);
    }
  });

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
  const handleEditClick = () => {
    setIsEditing(true);
  };

  
  const handleFileChange = (file) => {
    // Assuming file is the uploaded image
    try {
      const profile = Auth.getProfile();
      const userId = profile.data._id;

      updateUser({
        variables: {
          userId: userId,
          pfp: file // Pass the uploaded file 
        }
      });
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const handleNewPfp = (info) => {
    return setNewPfp(info);
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
          password: newPassword, // Lowercase 'p'
          pfp: newPfp 
        }
      });
  
      // Optional: Add success feedback or navigation
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err.message);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching profile: {error.message}</p>;

  

  return (
    <div>
      {/* pfp and userName */}
      <h1 className="flex justify-center mb-8">Hello {data.oneUser.userName}</h1>
      <div className="flex justify-center">
      
      <button onClick={() => setShowDragDrop(true)}>
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

      <div>
      {isEditing ? (
        <div>
          {/* DragDrop component with onCancel */}
          {showDragDrop && (
  <DragDrop
    onFileChange={(file) => {
      // Create a URL for the file to preview
      const fileUrl = URL.createObjectURL(file);
      
      // Set the file URL for preview
      setNewPfp(fileUrl);
      
      // Pass the actual file for upload
      handleFileChange(file);
    }}
    onCancel={() => {
      setShowDragDrop(false);
      setFileInfo(null);
    }}
  />
)}
        <form className='text-black' onSubmit={handleSaveEdit}>
        <input 
          type="text" 
          placeholder="New Username" 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)} 
          onKeyPress={handleKeyPress}
        />
        <input 
          type="password" 
          placeholder="New Password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          onKeyPress={handleKeyPress}
        />
        <button type="submit">Update Profile</button>
      </form>
      </div>
          ) : (
            <div className="flex items-center gap-4 justify-center">
            <button 
              className='text-xl px-2 py-1 border-2 rounded-lg font-medium' 
              onClick={() => {
                handleEditClick();
                setShowDragDrop(true);
              }}
            >
              Change Username/Password
            </button>
          </div>
          )}
          
          
      </div>

      <div className="pro">
        {data.oneUser.completedRegiments.map((regiment, index) => (
          <div key={index}>
            {regiment.progressPic && (
              <img 
                src={regiment.progressPic} 
                alt={`Progress pic for ${regiment.name}`} 
                style={{ maxWidth: '300px', maxHeight: '300px' }} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
