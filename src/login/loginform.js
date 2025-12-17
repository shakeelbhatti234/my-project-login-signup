import './loginform.css';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import RegisterForm from '../register/registerform';



function Loginform() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5002/api/user/user-login', {
        email,
        password,
      });

      // 🔹 Check what your API returns — assuming it sends token & message
      console.log('Login Response:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('✅ Login successful!');
      } else {
        alert(response.data.message || 'Login successful, but no token received.');
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error.response) {
        // Server responded but with an error status (400, 401, etc.)
        alert(error.response.data.message || 'Invalid credentials.');
      } else {
        // Network error or API not reachable
        alert('❌ Server not reachable. Please check API connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='container-fluid'>
        <div className="bg-image d-flex flex-column justify-content-center align-items-center vh-100">
          <div className='row'>
            <div className='col-6'>
              <form onSubmit={handleLogin}>
                <div className="p-4 rounded-4 shadow bg-transparent" style={{ width: "350px" }}>
                  <div className="mb-4">
                    <p className="logo-color">Your Logo</p>
                  </div>

                  <h2 className="mb-3 fw-bold">Login</h2>

                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-grid mb-3">
                    <button type="submit" className="btn button" disabled={loading}>
                      {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </div>

                  <p className="text-center mb-2">Or Continue with</p>

                  <div className="d-flex justify-content-center gap-3 mb-3">
                    <img src="./image/Frame 6.png" alt="Google" width="70" height="35" />
                    <img src="./image/Frame 8.png" alt="Facebook" width="50" height="35" />
                    <img src="./image/Frame 7.png" alt="Github" width="50" height="35" />
                  </div>

                  <p className="text-center mb-0">
                    Don't have an account?{""} <Link to="RegisterForm" className='rbtn-heading' type='button'>Register for free</Link>
                  </p>
                </div>
              </form>
            </div>

            <div className='col-6'>
              <img src="./image/right lg image.png" className="img-fluid" alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginform;








