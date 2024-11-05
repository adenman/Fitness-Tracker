'use client'


import Auth from '../utils/auth';


function NavTabs() {
 
  

  return (
    <div className="g mb-32">
    <header className="absolute inset-x-0 top-0 z-50 r ">
      <nav aria-label="Global" className="flex items-center justify-between lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-6 ">
            <span className="sr-only">DevNest</span>
            <img
              alt="DevNest Logo"
              src="/Logo.png"
              className="h-40 w-auto"
            />
          </a>
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {Auth.loggedIn() ? (
            <> 
            <button onClick={Auth.logout()}> 
            <a href="/Profile" className="text-sm mr-3 font-semibold leading-6 text-white">
            Logout 
          </a>
          </button>
          <a href="/Profile" className="text-sm font-semibold leading-6 text-white">
          Profile <span aria-hidden="true">&rarr;</span>
        </a>
        </>
          ) : (
          <a href="/LogIn" className="text-sm font-semibold leading-6 text-black">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
          )}
        </div>
      </nav>
      
    </header>
  </div>
  );
}

export default NavTabs;
