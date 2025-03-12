
import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import './App.css';
import App from "./App.jsx";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/signup.jsx";
import Profile from "./pages/Profile.jsx";
import NewWorkout from "./pages/newWorkout.jsx";
import Regiment from "./pages/Regiment.jsx";
import Log from "./pages/Log.jsx";

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
      {
        path: "/Log/:userId",
        element: <Log />,
      },
    ],
  },
], {
  basename: '/'
});



ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);


// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );