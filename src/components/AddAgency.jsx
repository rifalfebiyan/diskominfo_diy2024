import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddAgency = () => {
  const [agency, setAgency] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgency(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/agencies', agency, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 201) {
        alert('Instansi berhasil ditambahkan');
        navigate('/agency');
      }
    } catch (error) {
      console.error('Error adding agency:', error);
      alert('Gagal menambahkan instansi: ' + error.message);
    }
  };

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">TAMBAH INSTANSI</p>

          <div className="mb-2">
            <label className="form-label">Nama Instansi*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="name"
              value={agency.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Email*</label>
            <input
              type="email"
              className="form-control border border-dark"
              name="email"
              value={agency.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">No Telepon*</label>
            <input
              type="tel"
              className="form-control border border-dark"
              name="phone"
              value={agency.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Alamat*</label>
            <textarea
              className="form-control border border-dark"
              name="address"
              value={agency.address}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default AddAgency;
