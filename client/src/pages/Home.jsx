import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import Auth from "./../utils/auth";
import {GET_REGIMENTS} from '../utils/queries'

export default function Home() {
  const { loading, error, data } = useQuery(GET_REGIMENTS, {
    variables: { userId: Auth.getProfile()?.data?._id }
  });
  const navigate = useNavigate();
  if (loading) return <p>Loading...</p>;

  
  
  if (Auth.loggedIn()) {
    return (
      <>
      <div>
        <div className='flex justify-center items-center w-full relative'>
        <div className='flex justify-center' style={{width: "120px", height: "120px"}}>
          <img src="/flame.png" alt="Fitness Tracker Flame Logo" />
          <div className="absolute top-20 right-26 bg-yellow rounded-full w-10 h-10 flex items-center justify-center">
            <span className="text-black font-bold text-3xl">5</span>
          </div>
        </div>
        </div>
        <h2 className='text-white flex justify-center'>Day Streak</h2>
        <h2>hello </h2>
      </div>


      <div>
        <div className='flex justify-center items-center w-full relative row'>
          <div className='flex justify-center t' >
            <h2>workout Name</h2>
          </div>
          
          <h2 className='t flex justify-center'>Latest Workout</h2>
        </div>
      </div>


      <div>
      <div className="flex flex-wrap justify-center">
  <h3 className='text-white rounded'>Your Workouts</h3>
  </div>
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error loading regiments</p>
  ) : data?.userRegiments?.length ? (
    <>
      {data.userRegiments.map((regiment, index) => (
  <div className="w-full" key={index}>
    <button 
      className="workout-card  test2 rounded p-4 my-2 mx-2 t back w-full"
      onClick={() => navigate(`/workout/${regiment._id}`)}
    >
      <div className="flex justify-between items-center w-full">
        <div>
        <h2 className="text-xl justify-center font-bold w-full text-center">{regiment.name}</h2>
        </div>
      </div>
    </button>
  </div>
))}
      <div className="w-full" >
      <button 
      className="workout-card border-2 blue-b rounded p-4 my-2 mx-2 t green w-full"
      onClick={() => navigate(`/newWorkout`)}
    >
          <div className="flex justify-between items-center w-full">
            <div>
              <h2 className="text-xl font-bold">Add New Workout</h2>
            </div>
          </div>
        
        </button>
      </div>
    </>
  ) : (
    <div className="text-center">
      <a href="/newWorkout" className="btn btn-primary">
        Add New Regiment
      </a>
    </div>
  )}
</div>
      </>
    );
  } else {
    return (
      <>
      <div>
        <h3 className='t rounded'>Workouts</h3>
        <ul className="list-group rounded">
          <li className="list-group-item text-center">
            <button onClick={() => navigate('/LogIn')}>LogIn to view workouts</button>
          </li>
        </ul>
        
        </div>
      </>
    );
  }
}