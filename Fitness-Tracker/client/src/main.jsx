import React from 'react';
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";

import App from "./App";
import Error from "./pages/Error";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/signup";
import Profile from "./pages/Profile";
import NewWorkout from "./pages/newWorkout";
import JobDetails from "./pages/JobDetails";

function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('id_token');
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return isAuthenticated ? children : <Navigate to="/logIn" />;
}

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
        element: <PrivateRoute><Profile /></PrivateRoute>,
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
        element: <PrivateRoute><NewWorkout /></PrivateRoute>,
      },
      {
        path: "/JobDetails/:jobId",
        element: <PrivateRoute><JobDetails /></PrivateRoute>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);