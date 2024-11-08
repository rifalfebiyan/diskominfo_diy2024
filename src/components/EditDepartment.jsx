import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
  const [department, setDepartment] = useState({
    name: '',
    phone: '',
    address: '',
    agencyId: ''
  });
  const [agencies, setAgencies] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchDepartment();
    fetchAgencies();
  }, []);

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/departments/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDepartment(response.data);
    } catch (error) {
      console.error('Error fetching department:', error);
    }
  };

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
      await axios.put(`http://localhost:8080/api/departments/${id}`, department, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Department updated successfully');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating department:', error);
      alert('Failed to update department');
    }
  };

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">EDIT BIDANG</p>

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

          <button type="submit" className="btn btn-danger w-100">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
