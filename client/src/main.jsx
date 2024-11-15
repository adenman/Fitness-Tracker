
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
import Regiment from "./pages/Regiment";





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
        path: "/workout/:regimentId",
        element: <Regiment />,
      },
      {
        path: "/profile/:userId",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);