import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const SIGN_UP = gql`
  mutation addUser($userName: String!, $password: String!) {
    addUser(userName: $userName, password: $password) {
      _id
      userName
      password
    }
  }
`;

export default function SignUp() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [addUser] = useMutation(SIGN_UP);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous errors
    
    try {
      const { data } = await addUser({
        variables: { 
          userName, 
          password 
        },
      });
      console.log('User signed up successfully:', data.addUser);
      navigate(`/LogIn`);
    } catch (err) {
      const message = err.networkError?.result?.errors?.[0]?.message || err.message;
      setErrorMessage(message);
      console.error('Signup error:', message);
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
                  <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                  <p className="text-white-50 mb-5">Create your account!</p>

                  <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <input 
                        type="text" 
                        id="typeEmailX" 
                        className="form-control form-control-lg"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="typeEmailX">Username</label>
                    </div>

                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <input 
                        type="password" 
                        id="typePasswordX" 
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="typePasswordX">Password</label>
                    </div>

                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}

                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">
                      Sign Up
                    </button>
                  </form>
                </div>

                <div>
                  <p className="mb-0">Already have an account? <a href="/LogIn" className="text-white-50 fw-bold">Sign In</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}