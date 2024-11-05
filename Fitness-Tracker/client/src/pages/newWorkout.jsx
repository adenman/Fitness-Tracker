import { useState } from 'react';
import WorkoutCards from "../components/workoutCardsCards";

'use client'

const NewWorkout = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [workoutName, setWorkoutName] = useState('New Workout');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setWorkoutName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <div>
      <h1 className='t text-center rounded'>Create New Workout!</h1>
      <ul className="list-group border border-warning b">
        
        {isEditing ? (
          <input
            type="text"
            value={workoutName}
            onChange={handleNameChange}
            onKeyPress={handleKeyPress}
            className="text-center form-control"
            autoFocus
          />
        ) : (
          <h1 className='text-white text-center rounded'>{workoutName}</h1>
        )}
        
        <button className='t' onClick={handleEditClick}>Edit Name</button>
        
        <a href="">
          <li className="list-group-item text-center">
            <button>workout</button>
          </li>
        </a>
        
        <a href="">
          <li className="list-group-item text-center">
            <button>workout</button>
          </li>
        </a>

        <a href="">
          <li className="list-group-item text-center">
            <button>workout</button>
          </li>
        </a>

        <a href="">
          <li className="list-group-item text-center">
            <button>workout</button>
          </li>
        </a>
      </ul>

      <h1 className="text-center text-warning mt-10">Workouts</h1>
      
      <WorkoutCards />
    </div>
  );
};

export default NewWorkout;