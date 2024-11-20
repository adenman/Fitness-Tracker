import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import Auth from "./../utils/auth";
import {GET_REGIMENTS} from '../utils/queries'
import {GET_USER_BY_ID } from "../utils/queries";

const calculateStreak = (completedRegiments) => {
  if (!completedRegiments || completedRegiments.length === 0) return 0;

  // Sort completed regiments by date in descending order
  const sortedRegiments = [...completedRegiments]
    .filter(regiment => regiment.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  let streak = 1;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  for (let i = 0; i < sortedRegiments.length - 1; i++) {
    const currentDate = new Date(sortedRegiments[i].date);
    const previousDate = new Date(sortedRegiments[i + 1].date);

    // Calculate the difference in days
    const dayDifference = Math.floor(
      (currentDate - previousDate) / (1000 * 60 * 60 * 24)
    );

    if (dayDifference === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};


export default function Home() {
  const { loading: lastWorkoutLoading, error: lastWorkoutError, data: lastWorkout } = useQuery(GET_USER_BY_ID, {
    variables: { userId: Auth.getProfile()?.data?._id },
  });
  
  const { loading, error, data } = useQuery(GET_REGIMENTS, {
    variables: { userId: Auth.getProfile()?.data?._id }
  });
  
  const navigate = useNavigate();

  const streak = calculateStreak(lastWorkout?.oneUser?.completedRegiments);


  
  if (loading || lastWorkoutLoading) return <p>Loading...</p>;
  
  const sortedRegiments = lastWorkout?.oneUser?.completedRegiments
    ?.filter(regiment => regiment.date)
    ?.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Get the most recent completed regiment
  const mostRecentRegiment = sortedRegiments?.[0];
  
  
  if (Auth.loggedIn()) {
    return (
      <>
      {streak === 0 ? (
        null
      ) : (
        <div>
        <div className='flex justify-center items-center w-full relative'>
        <div className='flex justify-center' style={{width: "120px", height: "120px"}}>
          <img src="/flame.png" alt="Fitness Tracker Flame Logo" />
          <div className="absolute top-20 right-26 bg-yellow rounded-full w-10 h-10 flex items-center justify-center">
            <span className="text-black font-bold text-3xl">{streak}</span>
          </div>
        </div>
        </div>
        <h2 className='text-white flex justify-center'>Day Streak</h2>
      </div>
      )}
      

      {lastWorkout?.oneUser?.completedRegiments?.length > 0 ? (
  <div>
    <div className='flex justify-center items-center w-full relative row'>
      <h2 className='flex justify-center'>Last Workout</h2>
      {mostRecentRegiment && (
        <div className="w-full">
          <button className="workout-card test2 rounded p-4 my-2 mx-2 t back w-full">
            <div className="flex justify-between items-center w-full">
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