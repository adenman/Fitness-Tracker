import { useState, useEffect } from 'react';
import { useWorkout } from './../components/context';


const NewRegiment = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [workoutName, setWorkoutName] = useState('New Workout');
    const { selectedExercise } = useWorkout();
    const [selectedWorkouts, setSelectedWorkouts] = useState(() => {
      const savedWorkouts = localStorage.getItem('currentSetup');
      return savedWorkouts ? JSON.parse(savedWorkouts) : [];
    });

    


    useEffect(() => {
      localStorage.setItem('currentSetup', JSON.stringify(selectedWorkouts));
    }, [selectedWorkouts]);

    useEffect(() => {
      if (selectedExercise) {
        setSelectedWorkouts(prev => [...prev, selectedExercise]);
      }
    }, [selectedExercise]);

    const handleDeleteWorkout = (indexToDelete) => {
      setSelectedWorkouts(prevWorkouts => 
        prevWorkouts.filter((_, index) => index !== indexToDelete)
      );
    };


    const handleSaveWorkout = () => {
      if (!selectedWorkouts || selectedWorkouts.length === 0) {
        return (
          <h2 className="text-center text-xl font-bold text-white mt-4">
            No Workouts Selected
          </h2>
        );
      }

      const workoutRegiment = {
        name: workoutName,
        exercises: selectedWorkouts,
        date: new Date().toISOString()
      };
      
      const savedRegiments = JSON.parse(localStorage.getItem('workoutRegiments') || '[]');
      savedRegiments.push(workoutRegiment);
      localStorage.setItem('workoutRegiments', JSON.stringify(savedRegiments));
      
      
      setSelectedWorkouts([]);
      setWorkoutName('New Workout');
    };

    
  
  
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
          {(!selectedWorkouts || selectedWorkouts.length === 0) && (
      <h2 className="text-center text-xl font-bold text-white my-4">
        Add a workout to your regiment
      </h2>
    )}
          
          {selectedWorkouts ? selectedWorkouts.map((workout, index) => (
            <div key={index} className="workout-card border-2 blue-b r rounded t p-4 my-2 mx-2">
              <div className="flex justify-between items-center w-full">
                <div>
                  <h2 className="text-xl font-bold">{workout.name}</h2>
                </div>
                <button 
                  className="text-red-500 font-bold hover:text-red-700 ml-4 text-2xl" 
                  onClick={() => handleDeleteWorkout(index)}
                >
                  X
                </button>
              </div>
            </div>
          )) : (
            <h2 className="text-xl font-bold">Select a workout to add to your regiment</h2>
          )}  
            <div className="flex justify-center w-full mt-4">
  <button 
    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
    onClick={() => handleSaveWorkout()}
  >
    Save Workout
  </button>
</div>      
        </ul>
        
      </div>
      
    );
  };
  

  export default NewRegiment;