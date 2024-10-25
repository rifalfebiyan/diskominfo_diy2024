import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditUser = ({ userData }) => {
  const [user, setUser] = useState({
    name: '',
    nip: '',
    email: '',
    phone: '',
    password: '',
    department: ''
  });
  const [departments, setDepartments] = useState([]); // State to hold department list
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch departments from localStorage when the component mounts
    const storedDepartments = JSON.parse(localStorage.getItem('departments')) || [];
    setDepartments(storedDepartments);

    // If userData is provided, set it as initial state
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user };
    
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('visitors')) || [];
    
    // Find the index of the user to be updated
    const userIndex = existingUsers.findIndex(user => user.nip === updatedUser.nip);
    
    if (userIndex !== -1) {
      // Update the user details
      existingUsers[userIndex] = updatedUser;
      
      // Update localStorage
      localStorage.setItem('visitors', JSON.stringify(existingUsers));
    }

    // Navigate back to admin dashboard
    navigate('/');
  };

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">EDIT USER</p>

          {/* Nama Input */}
          <div className="mb-2">
            <label className="form-label">Nama*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* NIP Input */}
          <div className="mb-2">
            <label className="form-label">NIP*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="nip"
              value={user.nip}
              onChange={handleInputChange}
              required
              readOnly // Optional: Prevent editing the NIP
            />
          </div>

          {/* Email Input */}
          <div className="mb-2">
            <label className="form-label">Email*</label>
            <input
              type="email"
              className="form-control border border-dark"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* No Telp Input */}
          <div className="mb-2">
            <label className="form-label">No Telp*</label>
            <input
              type="tel"
              className="form-control border border-dark"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-2">
            <label className="form-label">Password*</label>
            <input
              type="password"
              className="form-control border border-dark"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Bidang Dropdown */}
          <div className="mb-2">
            <label className="form-label">Bidang*</label>
            <select
              name="department"
              className="form-select border border-dark"
              value={user.department}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Bidang</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-danger w-100">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
