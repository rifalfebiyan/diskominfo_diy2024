import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser ] = useState({
    name: '',
    nip: '',
    email: '',
    phone: '',
    profilePicture: '',
    role: '',
    agencyName: '' // State untuk nama instansi
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAgencies(); // Fetch agencies first
        await fetchUserData(); // Then fetch user data
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      }
    };
    fetchData();
  }, []);
  
  const fetchAgencies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/agencies', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAgencies(response.data);
    } catch (error) {
      console.error('Error fetching agencies:', error);
      setError('Failed to load agencies');
    }
  };
  
  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      const { name, nip, email, phone, role, profile_picture, agency } = response.data;
  
      // Ambil nama instansi dari objek agency
      const agencyName = agency ? agency.name : 'Tidak ada instansi';
  
      setUser ({
        name,
        nip,
        email,
        phone,
        role,
        profilePicture: profile_picture,
        agencyName // Set agency name here
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

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
      const formData = new FormData();
      formData.append('profile_picture', fileInputRef.current.files[0]);

      await axios.post(
        `http://localhost:8080/api/users/${userId}/profile-picture`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setUser (prevUser    => ({ ...prevUser  , profilePicture: newProfilePicture }));
      setShowModal(false);
      alert('Profile picture updated successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile picture:', error);
      alert('Failed to update profile picture');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-3">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        {/* Profile Picture Section */}
        <Col md={3} className="text-center mb-4">
          <div
            className="position-relative"
            style={{
              width: '100%',
              paddingBottom: '100%',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onClick={() => fileInputRef.current.click()}
          >
            {user.profilePicture ? (
              <img src={`http://localhost:8080${user.profilePicture}`}
                alt="Profile"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%'
                }}
              >
                <span className="text-secondary" style={{ fontSize: '3rem' }}>👤</span>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleProfilePictureChange}
            accept="image/*"
          />
          <small className="text-muted mt-2 d-block">
            Klik untuk mengubah foto profil
          </small>
        </Col>

        {/* Profile Information Section */}
        <Col md={7}>
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-danger text-white py-3 text-center">
              <h5 className="mb-0 fw-bold">PROFILE AKUN</h5>
            </div>
            <div className="card-body p-4">
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>NIP</strong>
                </Col>
                <Col sm={8}>
                  {user.nip || '-'}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col sm={4}>
                  <strong>NAMA</strong>
                </Col>
                <Col sm={8}>
                  {user.name || '-'}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col sm={4}>
                  <strong>NOMOR TELEPON</strong>
                </Col>
                <Col sm={8}>
                  {user.phone || '-'}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col sm={4}>
                  <strong>EMAIL</strong>
                </Col>
                <Col sm={8}>
                  {user.email || '-'}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col sm={4}>
                  <strong>ROLE</strong>
                </Col>
                <Col sm={8}>
                  {user.role || '-'}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col sm={4}>
                  <strong>INSTANSI</strong>
                </Col>
                <Col sm={8}>
                  {user.agencyName || '-'} {/* Menampilkan nama instansi */}
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* Modal untuk konfirmasi penggantian foto */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Penggantian Foto Profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin mengganti foto profil?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSaveProfilePicture}> Ganti Foto
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;