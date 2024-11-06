const RegimentCard = ({ workout }) => {
    const handleAddClick = () => {
      // Now you have access to the full workout object
      console.log(workout);
      // Do something with the workout data
    };
  
    return (
      <div className="workout-card">
        <h3>{workout.name}</h3>
        <button onClick={handleAddClick}>+</button>
      </div>
    );
  };

  export default RegimentCard;