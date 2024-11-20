'use client'

import Auth from '../utils/auth';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom'
import {GET_USER_BY_ID } from "../utils/queries";
import { useQuery } from '@apollo/client';
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

function NavTabs() {
  const isLoggedIn = Auth.loggedIn();
  const profile = isLoggedIn ? Auth.getProfile() : null;
  const picture = profile?.data?.pfp || '/defaultpfp.PNG';
  const name = profile?.data?.userName || 'Guest';
  const id = profile?.data?._id;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { loading: lastWorkoutLoading, error: lastWorkoutError, data: lastWorkout } = useQuery(GET_USER_BY_ID, {
    variables: { userId: Auth.getProfile()?.data?._id },
  });

  const streak = calculateStreak(lastWorkout?.oneUser?.completedRegiments);


  return (
    <div className="g mb-32">
      <header className="absolute inset-x-0 top-0 z-50 test">
        <nav aria-label="Global" className="flex items-center justify-between p-4">
          <div className="flex">
            <button onClick={handleShow}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
              </svg>
            </button>
          </div>

          <div>
          {streak === 0 ? (
        null
      ) : (
        <div className="flex flex-col items-center justify-center">
    <div className="flex flex-col items-center justify-center" style={{width: "60px", height: "60px"}}>
      <img src="/flame.png" alt="Fitness Tracker Flame Logo" className="mt-1" />
      <div className="rounded-full w-10 h-10 flex items-center justify-center">
        <span className="font-bold text-1xl">{streak} Day Streak</span>
      </div>
      
    </div>
  </div>
      )}
          </div>
          
        </nav>
      </header>
  
      <Offcanvas show={show} onHide={handleClose} backdrop="static" className="g" style={{ backgroundColor: '#292828' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: 'white' }}>Hello {name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {Auth.loggedIn() ? (
            <div className="py-4 overflow-y-auto">
              <ul className="space-y-2 font-medium">
                <li>
                <button onClick={() => {navigate('/');handleClose();}}  className="flex items-center p-2 text-white rounded-lg group">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
                  <span className="ms-3">Home</span>
                </button>
                </li>
                
                <li>
                  <button onClick={()=> {navigate(`/profile/${id}`);handleClose();}} className="flex items-center p-2 text-white rounded-lg group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                  </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => {Auth.logout();handleClose();}} className="flex items-center p-2 text-white rounded-lg group">
                    <svg className="flex-shrink-0 w-5 h-5 text-white transition duration-75 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="py-4 overflow-y-auto">
              <ul className="space-y-2 font-medium">
                <li>
                  <a href="/" className="flex items-center p-2 text-white rounded-lg group">
                    
                    <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
                  </a>
                </li>
                <li>
                  <a href="/LogIn" className="flex items-center p-2 text-white rounded-lg group">
                    
                    <span className="flex-1 ms-3 whitespace-nowrap">LogIn</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default NavTabs;
