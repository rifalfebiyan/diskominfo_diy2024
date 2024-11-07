import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDepartment = () => {
  const [department, setDepartement] = useState({
    name: '',
    phone: '',
    address: '',
    agency_id: ''
  });
  const [agencies, setAgencies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgencies();
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
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartement(prev => ({
      ...prev,
      [name]: name === 'agency_id' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!department.agency_id) {
        alert('Silakan pilih Instansi');
        return;
      }
  
      console.log('Sending department data:', department); // Log data yang akan dikirim
  
      const response = await axios.post('http://localhost:8080/api/departments', department, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      console.log('Response:', response); // Log response dari server
  
      if (response.status === 201) {
        alert('Bidang berhasil ditambahkan');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error details:', error.response); // Log detail error
      alert('Failed to add department: ' + (error.response?.data?.error || error.message));
    }
  };

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
            <label htmlFor="agency_id" className="form-label">Instansi*</label>
            <select
              className="form-select border border-dark"
              id="agency_id"
              name="agency_id"
              value={department.agency_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Instansi</option>
              {agencies.map(agency => (
                <option key={agency.id} value={agency.id}>{agency.name}</option>
              ))}
            </select>
          </div>

           <button type="submit" className="btn btn-primary w-100">
            TAMBAH BIDANG
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
