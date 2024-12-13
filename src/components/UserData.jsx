import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';

// Component to display detail rows
const DetailRow = ({ label, value }) => (
  <div className="mb-2">
    <strong>{label}:</strong> {value}
  </div>
);

const UserData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State Management
  const [user, setUser ] = useState(null);
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

        setUser (userResponse.data);
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

  // Helper function to format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Tanggal tidak valid' : date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4">Detail Pengguna</h4>
      
      {/* User Details Card */}
      <Card className="mb-4">
      {/* <div className="card-header" style={{ backgroundColor: '#A83427', color: 'white' }}> */}
        <Card.Header style={{ backgroundColor: '#A83427', color: 'white' }}>
          {/* <h5 className="card-title mb-0">{user.name}</h5> */}
          <h5 className="card-title mb-0">Informasi Pengguna</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <DetailRow label="Nama" value={user.name || 'Tidak ada Nama'} />
              <DetailRow label="NIP" value={user.nip || 'Tidak ada NIP'} />
              <DetailRow label="Email" value={user.email || 'Tidak ada email'} />
              <DetailRow label="No Telepon" value={user.phone || 'Tidak ada nomor telepon'} />
            </Col>
            <Col md={6}>
              <DetailRow label="Role" value={user.role || 'Tidak memiliki role'} />
              <DetailRow label="Instansi" value={user.agency ? user.agency.name : 'Tidak terdaftar di instansi manapun'} />
              <DetailRow label="Tanggal Dibuat" value={formatDate(user.created_at)} />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Agency Details */}
      {user.agency && (
        <Card className="mb-4">
          <Card.Header style={{ backgroundColor: '#A83427', color: 'white' }}>
            <h5 className="card-title">Informasi Instansi</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              < Col md={6}>
                <DetailRow label="Nama Instansi" value={user.agency.name} />
                <DetailRow label="Email Instansi" value={user.agency.email || 'Tidak ada email instansi'} />
                <DetailRow label="No Telepon Instansi" value={user.agency.phone || 'Tidak ada nomor telepon instansi'} />
              </Col>
              <Col md={6}>
                <DetailRow label="Alamat Instansi" value={user.agency.address || 'Tidak ada alamat instansi'} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handleBack}>Kembali</Button>
        <Button variant="primary" onClick={handleEdit}>Edit Pengguna</Button>
      </div>
    </Container>
  );
};

export default UserData;