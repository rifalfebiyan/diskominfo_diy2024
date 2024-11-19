import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDepartment = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    name: '',
    phone: '',
    address: '',
    status: '', // status akan diisi dengan "Active" atau "Non-Active"
    email: '',
    agency_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const [agencies, setAgencies] = useState([]);

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
    setDepartment(prev => ({
      ...prev,
      [name]: name === 'agency_id' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/departments', department, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Departemen berhasil ditambahkan');
      navigate('/admin');
    } catch (error) {
      console.error('Error adding department:', error);
      alert('Gagal menambahkan departemen: ' + error.message);
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
            <label htmlFor="status" className="form-label">Status*</label>
            <select
              className="form-select border border-dark"
              id="status"
              name="status"
              value={department.status}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Status</option>
              <option value="Active">Active</option>
              <option value="Non-Active">Non-Active</option>
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email*</label>
            <input
              type="email"
              className="form-control border border-dark"
              id="email"
              name="email"
              value={department.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb- 2">
            <label htmlFor="agency_id" className="form-label">Pilih Agency*</label>
            <select
              className="form-select border border-dark"
              id="agency_id"
              name="agency_id"
              value={department.agency_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Agency</option>
              {agencies.map(agency => (
                <option key={agency.id} value={agency.id}>{agency.name}</option>
              ))}
            </select>
          </div>
          <br></br>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;