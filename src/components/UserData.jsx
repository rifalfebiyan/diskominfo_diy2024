import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';

const UserData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State Management
  const [user, setUser] = useState({
    name: '',
    nip: '',
    email: '',
    phone: '',
    role: '',
    profile_picture: '',
    agency_id: null,
    created_at: null
  });
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch User Data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch User Data
        const userResponse = await axios.get(`http://localhost:8080/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Set User Data
        setUser(userResponse.data);

        // Fetch Agency Data if agency_id exists
        if (userResponse.data.agency_id) {
          const agencyResponse = await axios.get(`http://localhost:8080/api/agencies/${userResponse.data.agency_id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setAgency(agencyResponse.data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Gagal memuat data pengguna');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  // Handler Functions
  const handleEdit = () => {
    navigate(`/edit-user/${id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Render Loading
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Memuat data...</p>
      </Container>
    );
  }

  // Render Error
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h4 className="mb-4">Detail Pengguna</h4>
      
      {/* User Details Card */}
      <Card className="mb-4">
        <Card.Header className="bg-danger text-white">
          <h5 className="card-title mb-0">{user.name}</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <DetailRow label="NIP" value={user.nip || 'Tidak ada NIP'} />
              <DetailRow label="Email" value={user.email || 'Tidak ada email'} />
              <DetailRow label="No Telepon" value={user.phone || 'Tidak ada nomor telepon'} />
            </Col>
            <Col md={6}>
              <DetailRow label="Role" value={user.role || 'Tidak memiliki role'} />
              <DetailRow 
                label="Instansi" 
                value={agency ? agency.name : 'Tidak terdaftar di instansi manapun'} 
              />
              <DetailRow 
                label="Tanggal Dibuat" 
                value={user.created_at 
                  ? new Date(user.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) 
                  : 'Tanggal tidak tersedia'
                } 
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Agency Details */}
      {agency && (
        <Card className="mb-4">
          <Card.Header>
            <h5 className="card-title">Informasi Instansi</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <DetailRow label="Nama Instansi" value={agency.name} />
                <DetailRow label="Email Instansi" value={agency.email || 'Tidak ada email'} />
              </Col>
              <Col md={6}>
                <DetailRow label="No Telepon Instansi" value={agency.phone || 'Tidak ada nomor telepon'} />
                <DetailRow label="Alamat Instansi" value={agency.address || 'Tidak ada alamat'} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Profile Picture */}
      {user.profile_picture && (
        <Card className="mb-4">
          <Card.Header>
            <h5 className="card-title">Foto Profil</h5>
          </Card.Header>
          <Card.Body className="text-center">
            <img 
              src={`http://localhost:8080${user.profile_picture}`} 
              alt="Profile" 
              className="img-fluid rounded"
              style={{ maxHeight: '300px' }}
            />
          </Card.Body>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="d-flex gap-2">
        <Button variant="danger" onClick={handleEdit}>Edit</Button>
        <Button variant="secondary" onClick={handleBack}>Kembali</Button>
      </div>
    </Container>
  );
};

// Komponen pembantu untuk menampilkan baris detail
const DetailRow = ({ label, value }) => (
  <div className="mb-2">
    <strong>{label}:</strong> {value}
  </div>
);

export default UserData;