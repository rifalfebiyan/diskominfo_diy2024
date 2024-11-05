import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    name: '',
    phone: '',
    address: '',
    agencyId: ''
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

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/departments', department, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Department added successfully');
      navigate('/admin');
    } catch (error) {
      console.error('Error adding department:', error);
      alert('Failed to add department');
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="agencyId" className="form-label">Instansi*</label>
            <select
              className="form-select border border-dark"
              id="agencyId"
              name="agencyId"
              value={department.agencyId}
              onChange={handleChange}
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
