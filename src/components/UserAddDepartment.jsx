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
    fetchUserAgency();
  }, []);

  // Fetch user's agency data
  const fetchUserAgency = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Set agency_id dari data user
      if (response.data.agency_id) {
        setUserAgency(response.data.agency);
        setDepartment(prev => ({
          ...prev,
          agency_id: response.data.agency_id
        }));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user agency:', error);
      setError('Failed to fetch user agency data');
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
    try {
      console.log('Sending department data:', department);

      const response = await axios.post('http://localhost:8080/api/departments', department, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Response:', response);

      if (response.status === 201) {
        alert('Bidang berhasil ditambahkan');
        navigate('/user');
      }
    } catch (error) {
      console.error('Error details:', error.response);
      alert('Failed to add department: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return <div className="container mt-3">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-3 alert alert-danger">{error}</div>;
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
            />
          </div>

          <div className="mb-2">
            <label htmlFor="agency_id" className="form-label">Instansi</label>
            <input
              type="text"
              className="form-control border border-dark"
              value={userAgency ? userAgency.name : 'Loading...'}
              disabled
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            TAMBAH BIDANG
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAddDepartment;