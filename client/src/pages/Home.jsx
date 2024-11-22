import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import Auth from "./../utils/auth";
import {GET_REGIMENTS} from '../utils/queries'
import {GET_USER_BY_ID } from "../utils/queries";




export default function Home() {
  const { loading: lastWorkoutLoading, error: lastWorkoutError, data: lastWorkout } = useQuery(GET_USER_BY_ID, {
    variables: { userId: Auth.getProfile()?.data?._id },
  });
  
  const { loading, error, data } = useQuery(GET_REGIMENTS, {
    variables: { userId: Auth.getProfile()?.data?._id }
  });
  
  const navigate = useNavigate();

 


  
  if (loading || lastWorkoutLoading) return <p>Loading...</p>;
  
  const sortedRegiments = lastWorkout?.oneUser?.completedRegiments
    ?.filter(regiment => regiment.date)
    ?.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Get the most recent completed regiment
  const mostRecentRegiment = sortedRegiments?.[0];
  
  
  if (Auth.loggedIn()) {
    return (
      <>
      {lastWorkout?.oneUser?.completedRegiments?.length > 0 ? (
  <div>
    <div className='flex justify-center items-center w-full relative row'>
      <h2 className='flex justify-center'>Last Workout</h2>
      {mostRecentRegiment && (
        <div className="w-full">
          <button className="workout-card test2 border-3 rounded-full p-4 my-2 mx-2 t back w-full">
            <div className="flex justify-center items-center w-full">
              <div>
                <h2 className="text-xl justify-center font-bold w-full text-center">
                  {mostRecentRegiment.name}
                </h2>
                <p>{mostRecentRegiment.date}</p>
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  </div>
) : null}

      


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
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {data.userRegiments.map((regiment, index) => (
  <div className="w-full" key={index}>
    <button 
      className="workout-card test2 border-2 rounded-full p-3 my-2 mx-2 t back w-full  shadow-md  overflow-hidden 
            transition duration-100 ease-in-out 
            transform active:scale-95 
            hover:shadow-lg"
      onClick={() => navigate(`/workout/${regiment._id}`)}
    >
      <div className="flex justify-center items-center w-full">
        <div>
        <h2 className="font-bold w-full small-text">{regiment.name}</h2>
        </div>
      </div>
    </button>
  </div>
))}
</div>
      <div className="w-full" >
      <button 
      className="workout-card border-3 blue-b rounded-full p-4 my-2 mx-2 t test2 w-full"
      onClick={() => navigate(`/newWorkout`)}
    >
          <div className="flex justify-center items-center w-full">
            <div className='flex justify-center'>
              <h2 className="text-xl flex justify-center font-bold">Add New Workout</h2>
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
        <div className='flex justify-center'>
        <img  src="/MuscleMakerLogo.png" alt="" />
        </div>
        <h3 className='t flex justify-center'>Login or Sign Up to Start Working out</h3>
        <div className='flex justify-center'>
            <button className='px-3 py-3 rounded test border-2 accentb' onClick={() => navigate('/LogIn')}>Log In </button>
        </div>
        </div>
      </>
    );
  }
}