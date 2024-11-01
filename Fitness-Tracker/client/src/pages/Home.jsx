import  Cal  from './../components/Cal';
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Home() {
  

  
  return (
    <>
    <div>
      <h3 className='text-warning rounded'>Workouts</h3>
      <ul className="list-group rounded">
        
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
          <li className="list-group-item">A fourth item</li>
          <li className="list-group-item">And a fifth one</li>
          <li className="list-group-item text-center">+</li>
      </ul>
      <Cal />
      
      </div>
    </>
  );
}
