import { useState } from 'react';
import WorkoutCards from "../components/WorkoutCards";
import { useWorkout } from './../components/context';


const NewWorkout = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [workoutName, setWorkoutName] = useState('New Workout');
  const { selectedExercise } = useWorkout();

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
      <ul className="list-group border blue-b b">
        
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
        
        <li>
  <div>
    <h2>{selectedExercise ? selectedExercise.name : 'Select an exercise'}</h2>
  </div>
</li>
      </ul>

      <h1 className="text-center t mt-10">Workouts</h1>
      
      <WorkoutCards />
    </div>
  );
};

export default NewWorkout;