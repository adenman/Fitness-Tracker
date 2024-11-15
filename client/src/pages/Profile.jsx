import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SIGN_OUT } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {GET_USER_BY_ID } from "../utils/queries";



export default function Profile({ onLogout }) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId: userId },
  });



  


  const [signOut] = useMutation(SIGN_OUT, {
    onCompleted: () => {      
      onLogout(); 
    },
    onError: (err) => {
      console.error("Logout error:", err);
    },
  });



  const [skills, setSkills] = useState("");

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSkill({ variables: { userId, skill: skills } });
      console.log(skills); // Call the mutation with userId and skills
      setSkills(""); // Clear the input after submission
    } catch (err) {
      console.error("Error submitting skills:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching profile: {error.message}</p>;

  

  return (
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
  );
}
