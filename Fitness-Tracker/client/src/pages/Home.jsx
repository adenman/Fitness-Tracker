import  Cal  from './../components/Cal';
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Home() {
  

  
  return (
    <>
    <div>
      <h3 className='text-warning rounded'>Workouts</h3>
      <ul className="list-group rounded">
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

        <a href="/newWorkout">
          <li className="list-group-item text-center">
            <button>+</button>
          </li>
        </a>
      </ul>
      <Cal />
      
      </div>
    </>
  );
}
