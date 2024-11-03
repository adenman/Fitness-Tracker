import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const SIGN_IN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(userName: $username, password: $password) {
      user {
        _id
        userName
      }
      token
    }
  }
`;

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const [login, { error }] = useMutation(SIGN_IN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await login({
        variables: { username, password },
      });
      
      console.log('Full login response:', data);
      console.log('Token value:', data.login.token);
      
      localStorage.setItem('id_token', data.login.token);
      navigate('/');
      
    } catch (err) {
      console.error('Login error:', err);
    }
  };

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

                  <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                      <label className="form-label" htmlFor="typeEmailX">Username</label>
                    </div>
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                      <label className="form-label" htmlFor="typePasswordX">Password</label>
                    </div>
                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                  </form>
                </div>
                {error && <p className='error'>{error}</p>}
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