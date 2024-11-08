import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { useState } from 'react';





function Login(props) {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN);

  async function submitUser(event) {
    event.preventDefault()
    try {
      const { data } = await login({
        variables: { 
          userName: userName,
          password: password 
        }
      });
      
      if (data && data.login && data.login.token) {
        localStorage.setItem('id_token', data.login.token);
        window.location.href = '/'; 
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.log('Error details:', error);
      alert('Login error: ' + error.message);
    }
  }



  return (
    
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <form onSubmit={submitUser}>
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                    <input
                      placeholder="username"
                      name="userName" 
                      type="text"     
                      id="username"
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                      <label className="form-label" htmlFor="username">Username</label>
                    </div>
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                    <input
                      placeholder="********"
                      name="password"
                      type="password"
                      id="pwd"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>
                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                  </form>
                </div>
                
                <div>
                  <p className="mb-0">Don't have an account? <a href="/Signup" className="fw-bold text-warning">Sign Up</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
}

export default Login;