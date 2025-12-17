import './registerform.css';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    address: '',
    dob: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5002/api/user/register',
        formData
      );

      if (response.data.success || response.status === 201) {
        alert('Registration successful!');
      } else {
        alert(response.data.message || 'Registration failed!');
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Error while registering.');
      } else {
        alert('Server not reachable.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="bg-image d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="row">
          <div className="col-6">
            <form onSubmit={handleRegister}>
              <div className="p-4 rounded-4 shadow bg-transparent" style={{ width: "350px" }}>
                <div className="color mb-2">Your Logo</div>
                <h2 className="fw-bold mb-3">Register</h2>

                <span>Name</span>
                <input type="text" name="name" className="form-control mb-3"
                  placeholder="Enter Your Name" value={formData.name} onChange={handleChange} required />

                <span>Email</span>
                <input type="email" name="email" className="form-control mb-3"
                  placeholder="Enter Your Email" value={formData.email} onChange={handleChange} required />

                <span>Password</span>
                <input type="password" name="password" className="form-control mb-3"
                  placeholder="Enter Your Password" value={formData.password} onChange={handleChange} required />

                <span>Phone</span>
                <input type="number" name="phone" className="form-control mb-3"
                  placeholder="Enter Your Phone Number" value={formData.phone} onChange={handleChange} required />

                <span>Gender</span>
                <input type="text" name="gender" className="form-control mb-3"
                  placeholder="Enter Your Gender" value={formData.gender} onChange={handleChange} required />

                <span>Address</span>
                <input type="text" name="address" className="form-control mb-3"
                  placeholder="Enter Your Address" value={formData.address} onChange={handleChange} required />

                <span>Date of Birth</span>
                <input type="date" name="dob" className="form-control mb-3"
                  value={formData.dob} onChange={handleChange} required />

                <div className='d-grid text-center'>
                  Already have an Account?{" "}
                  <Link to="/" className="btn-heading">Sign In</Link>
                </div>

              </div>
            </form>
          </div>

          <div className="col-6">
            <img src="./image/right lg image.png" className="img-fluid" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
