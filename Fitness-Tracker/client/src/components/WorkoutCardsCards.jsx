
import { Card } from "flowbite-react";





function workoutCards() {
  return (
    <>
    {/* <div className="flex flex-row items-center gap-4  mx-auto m-5 border border-warning b text-warning">
      <img src="/defaultpfp.PNG" alt="" className="h-28 w-auto" />
      <h2>Workout title</h2>
      <p>description</p>
      <button className="text-6xl ">+</button>
      
    </div> */}
    <div className="flex flex-col items-center w-1/2 mx-auto mt-8">
      
        <Card  className="w-full p-4 mb-6 border-4 border-warning bg-black text-warning">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-6">
              <h5 className="mt-3 text-2xl font-medium text-center">
              Workout Title
              </h5>
              <img
                
                height="128"
                src={ "/defaultpfp.PNG"}
                width="128"
                className="rounded-full shadow-lg object-cover"
              />
              
              
            </div>
            <div className="flex-grow">
              
              <span className="text-base">
                descripton  descripton  descripton  descripton  descripton  descripton  descripton  descripton  descripton 
              </span>
              
            </div>
          </div>
        </Card>
    </div>
    </>
  );
}

export default workoutCards;