
import WorkoutCards from "../components/workoutCardsCards";
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';


'use client'

const GET_JOBS = gql`
query Job {
  Job {
    _id
    name
    pay
  }
}
`;

const newWorkout = () => {
  const { loading, error,  } = useQuery(GET_JOBS);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className='text-warning  text-center rounded'>Create New Workout!</h1>
      <ul className="list-group  border border-warning b">
      <h1 className='text-warning  text-center rounded'>Name</h1>
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
      

  <div className="container d-flex justify-content-center ">
  <div className="input-group mt-10 flex flex-col" style={{ maxWidth: '500px' }}>
  <form id="search-form">
            <select id="muscle-name" className="form-select w-100 mt-2">
              <option value="">All Muscle Names</option>
              <option value="quadriceps">Quadriceps</option>
              <option value="hamstrings">Hamstrings</option>
              <option value="calves">Calves</option>
              <option value="chest">Chest</option>
              <option value="biceps">Biceps</option>
              <option value="triceps">Triceps</option>
              <option value="abdominals">Abdominals</option>
            </select>
            
          </form>
          <form id="search-form">
            <select id="muscle-name" className="form-select w-100 mt-2">
              <option value="">All Muscle Names</option>
              <option value="quadriceps">Quadriceps</option>
              <option value="hamstrings">Hamstrings</option>
              <option value="calves">Calves</option>
              <option value="chest">Chest</option>
              <option value="biceps">Biceps</option>
              <option value="triceps">Triceps</option>
              <option value="abdominals">Abdominals</option>
            </select>
  
          </form>
          <form id="search-form">
            <select id="muscle-name" className="form-select w-100 mt-2">
              <option value="">All Muscle Names</option>
              <option value="quadriceps">Quadriceps</option>
              <option value="hamstrings">Hamstrings</option>
              <option value="calves">Calves</option>
              <option value="chest">Chest</option>
              <option value="biceps">Biceps</option>
              <option value="triceps">Triceps</option>
              <option value="abdominals">Abdominals</option>
            </select>
        <div className="d-flex justify-content-center mt-2">
          <button type="submit" className="btn bg-warning">Search</button>
        </div>
          </form>
  </div>
</div>
<WorkoutCards />
    </div>
  );
};



export default newWorkout;