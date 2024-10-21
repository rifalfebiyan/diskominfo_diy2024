import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    name: 'RIFAL', // Hanya contoh, gunakan dari state yang benar
    nip: '4680543456',
    email: 'rifal123@gmail.com',
    phone: '09217639184712941',
    department: 'APTIKA',
    profilePicture: ''
  });

  useEffect(() => {
    // Fetch users from localStorage and find the specific user by ID
    const storedUsers = JSON.parse(localStorage.getItem('visitors')) || [];
    const currentUser = storedUsers[userId];
    if (currentUser) {
      setUser(currentUser);
    }
  }, [userId]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        {/* Profile Picture Section */}
        <div className="col-md-3 text-center">
          <div
            className="bg-secondary rounded"
            style={{
              width: '100%',
              height: '300px',
              backgroundColor: '#D3B0A6',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="rounded"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <p className="text-light">Tidak ada foto profil</p>
            )}
          </div>
          <div className="mt-3 text-start">
            <p className="text-muted">Terakhir kali diupdate :</p>
            <p className="fw-bold">28 FEBRUARI 2024</p>
            <p className="text-muted">Dibuat pada :</p>
            <p className="fw-bold">25 Februari 2024</p>
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="col-md-7">
          <h4 className="fw-bold" style={{ backgroundColor: '#A63B2A', color: '#FFF', padding: '10px', borderRadius: '10px 10px 0 0' }}>
            PROFILE AKUN
          </h4>
          <div className="p-4 shadow-sm" style={{ backgroundColor: '#FFFFFF', borderRadius: '0 0 10px 10px' }}>
            <div className="mb-2">
              <strong>NIP</strong>
              <p>{user.nip}</p>
            </div>

            <div className="mb-2">
              <strong>NAMA</strong>
              <p>{user.name}</p>
            </div>

            <div className="mb-2">
              <strong>NOMOR TELEPON</strong>
              <p>{user.phone}</p>
            </div>

            <div className="mb-2">
              <strong>Email</strong>
              <p>{user.email}</p>
            </div>

            <div className="mb-2">
              <strong>Bidang</strong>
              <p>{user.department}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
