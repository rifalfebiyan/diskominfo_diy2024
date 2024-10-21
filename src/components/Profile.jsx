import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams(); // Assuming userId is passed via URL
  const [user, setUser] = useState({
    name: '',
    nip: '',
    email: '',
    phone: '',
    department: '',
    profilePicture: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from localStorage and find the specific user by ID
    const storedUsers = JSON.parse(localStorage.getItem('visitors')) || [];
    const currentUser = storedUsers[userId];
    if (currentUser) {
      setUser(currentUser);
    }
  }, [userId]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container my-4">
      <div className="card border-0 shadow-lg p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary">Profil Pengguna</h3>
        </div>

        {/* Profile Picture */}
        {user.profilePicture ? (
          <div className="text-center mb-4">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="rounded-circle shadow-sm"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div className="text-center mb-4">
            <p className="text-muted">Tidak ada foto profil</p>
          </div>
        )}

        {/* User Information */}
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Nama:</label>
          <p className="fs-5 text-dark">{user.name}</p>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">NIP:</label>
          <p className="fs-5 text-dark">{user.nip}</p>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Email:</label>
          <p className="fs-5 text-dark">{user.email}</p>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">No Telp:</label>
          <p className="fs-5 text-dark">{user.phone}</p>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Bidang:</label>
          <p className="fs-5 text-dark">{user.department}</p>
        </div>

        <button 
          className="btn btn-primary w-100 py-2 mt-3" 
          onClick={handleBack}
          style={{ fontWeight: 'bold' }}
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default Profile;
