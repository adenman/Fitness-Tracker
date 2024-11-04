
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";


import App from "./App";
import Error from "./pages/Error";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/signup";
import Profile from "./pages/Profile";
import NewWorkout from "./pages/newWorkout";
import JobDetails from "./pages/JobDetails";





const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",     
        element: <Profile />,
      },
      {
        path: "/LogIn",
        element: <LogIn />,
      },
      {
        path: "/SignUp",
        element: <SignUp />,
      },
      {
        path: "/newWorkout",
        element: <NewWorkout />,
      },
      {
        path: "/JobDetails/:jobId",
        element: <JobDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);