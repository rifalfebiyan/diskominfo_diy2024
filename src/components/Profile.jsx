// src/components/Profile.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    nip: '',
    email: '',
    phone: '',
    department: '',
    profilePicture: ''
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
          throw new Error('User tidak terautentikasi');
        }

        const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUser({
          name: response.data.name,
          nip: response.data.nip,
          email: response.data.email,
          phone: response.data.phone,
          department: response.data.department,
          profilePicture: response.data.profile_picture || ''
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfilePicture = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      // Kirim foto profil baru ke server
      await axios.put(`http://localhost:8080/api/users/${userId}`, {
        profile_picture: newProfilePicture
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setUser(prev => ({
        ...prev,
        profilePicture: newProfilePicture
      }));
      setShowModal(false);
    } catch (error) {
      console.error('Error updating profile picture:', error);
      alert('Gagal mengupdate foto profil');
    }
  };

  const handleClickProfilePicture = () => {
    fileInputRef.current.click();
  };

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-center text-danger">{error}</div>;
  }

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
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={handleClickProfilePicture}
          >
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="rounded"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }}
              />
            ) : (
              <p className="text-light">Klik untuk ganti foto profil</p>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleProfilePictureChange}
            accept="image/*"
          />
        </div>

        {/* Profile Information Section */}
        <div className="col-md-7">
          <h4 className="fw-bold" style={{ backgroundColor: '#A63B2A', color: '#FFF', padding: '10px', borderRadius: '10px 10px 0 0' }}>
            PROFILE AKUN
          </h4>
          <div className="p-4 shadow-sm" style={{ backgroundColor: '#FFFFFF', borderRadius: '0 0 10px 10px' }}>
            <div className="mb-2">
              <strong>NIP</strong>
              <p>{user.nip || '-'}</p>
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

      {/* Modal untuk konfirmasi penggantian foto */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Ganti Foto Profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin mengganti foto profil?</p>
          {newProfilePicture && (
            <div>
              <p className="text-center">Pratinjau Foto Baru:</p>
              <img
                src={newProfilePicture}
                alt="New Profile"
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px' }}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSaveProfilePicture}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;