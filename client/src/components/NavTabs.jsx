'use client'

import Auth from '../utils/auth';
import { useEffect } from 'react';
import { Dropdown } from 'flowbite';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';

function NavTabs() {
  const isLoggedIn = Auth.loggedIn();
  const profile = isLoggedIn ? Auth.getProfile() : null;
  const picture = profile?.data?.pfp || '/defaultpfp.PNG';
  const name = profile?.data?.userName || 'Guest';

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <div className="flex">
            <button >
              Login
            </button>
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
                  <a href="#" className="flex items-center p-2 text-white rounded-lg group">
                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                    </svg>
                    <span className="ms-3">Home</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-white rounded-lg group">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Regiments</span>
                    <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-white rounded-lg group">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                      <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-white rounded-lg group">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                  </a>
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
