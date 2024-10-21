import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    name: 'RIFAL',
    nip: '4680543456',
    email: 'rifal123@gmail.com',
    phone: '09217639184712941',
    department: 'APTIKA',
    profilePicture: ''
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('visitors')) || [];
    const currentUser = storedUsers[userId];
    if (currentUser) {
      setUser(currentUser);
    }
  }, [userId]);

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

  const handleSaveProfilePicture = () => {
    const updatedUser = { ...user, profilePicture: newProfilePicture };
    setUser(updatedUser);
    const storedUsers = JSON.parse(localStorage.getItem('visitors')) || [];
    storedUsers[userId] = updatedUser;
    localStorage.setItem('visitors', JSON.stringify(storedUsers));
    setShowModal(false);
  };

  const handleClickProfilePicture = () => {
    fileInputRef.current.click();
  };

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
                  width: '100%', // Tetap lebar 100%
                  height: '100%', // Tetap tinggi 100%
                  objectFit: 'cover', // Memastikan gambar tidak merusak layout
                  borderRadius: '10px' // Tambahkan radius untuk tampilan lebih halus
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
