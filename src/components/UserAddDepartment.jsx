import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserAddDepartment = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    name: '',
    phone: '',
    address: '',
    agency_id: ''
  });
  const [userAgency, setUserAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  // Fetch user's data including agency
  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.agency_id) {
        // Fetch agency details
        const agencyResponse = await axios.get(`http://localhost:8080/api/agencies/${response.data.agency_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        setUserAgency(agencyResponse.data);
        setDepartment(prev => ({
          ...prev,
          agency_id: response.data.agency_id
        }));
      } else {
        setError('User tidak memiliki instansi yang terdaftar');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Gagal mengambil data user dan instansi');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!department.agency_id) {
      alert('Anda harus terdaftar pada sebuah instansi untuk menambahkan bidang');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/departments', department, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 201) {
        alert('Bidang berhasil ditambahkan');
        navigate('/user');
      }
    } catch (error) {
      console.error('Error details:', error.response);
      alert('Gagal menambahkan bidang: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return (
      <div className="container mt-3">
        <div className="alert alert-info">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-3">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!userAgency) {
    return (
      <div className="container mt-3">
        <div className="alert alert-warning">
          Anda harus terdaftar pada sebuah instansi untuk menambahkan bidang.
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">TAMBAH BIDANG</p>

          <div className="mb-2">
            <label htmlFor="name" className="form-label">Nama Bidang*</label>
            <input
              type="text"
              className="form-control border border-dark"
              id="name"
              name="name"
              value={department.name}
              onChange={handleInputChange}
              required
              placeholder="Masukkan nama bidang"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="phone" className="form-label">No Telepon*</label>
            <input
              type="tel"
              className="form-control border border-dark"
              id="phone"
              name="phone"
              value={department.phone}
              onChange={handleInputChange}
              required
              placeholder="Masukkan nomor telepon"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="address" className="form-label">Alamat*</label>
            <input
              type="text"
              className="form-control border border-dark"
              id="address"
              name="address"
              value={department.address}
              onChange={handleInputChange}
              required
              placeholder="Masukkan alamat"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="agency" className="form-label">Instansi</label>
            <div className="form-control border border-dark bg-light">
              {userAgency.name}
            </div>
            <small className="text-muted">
              Bidang akan ditambahkan ke instansi {userAgency.name}
            </small>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={!userAgency}
          >
            TAMBAH BIDANG
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAddDepartment;