import { useNavigate } from 'react-router-dom';
import Cal from './../components/Cal';
import 'bootstrap/dist/css/bootstrap.min.css'
import Auth from "./../utils/auth";

export default function Home() {
  const navigate = useNavigate();
  
  if (Auth.loggedIn()) {
    return (
      <>
      <div>
        <h3 className='text-white rounded'>Workouts</h3>
        <ul className="list-group rounded">
          <li className="list-group-item text-center">
            <button onClick={() => navigate('/workout')}>workout</button>
          </li>

          <li className="list-group-item text-center">
            <button onClick={() => navigate('/workout')}>workout</button>
          </li>

          <li className="list-group-item text-center">
            <button onClick={() => navigate('/workout')}>workout</button>
          </li>

          <li className="list-group-item text-center">
            <button onClick={() => navigate('/newWorkout')}>+</button>
          </li>
        </ul>
        <Cal />
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
            <button onClick={() => navigate('/newWorkout')}>LogIn to view workouts</button>
          </li>
        </ul>
        <Cal />
        </div>
      </>
    );
  }
}