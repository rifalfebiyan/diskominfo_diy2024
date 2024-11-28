import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddUser  = () => {
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState([]);
  const [user, setUser ] = useState({
    name: '',
    nip: '',
    email: '',
    password: '',
    phone: '',
    agency_id: '',
    role: ''
  });

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
    setUser (prev => ({
      ...prev,
      [name]: name === 'agency_id' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user.agency_id) {
        alert('Silakan pilih Instansi');
        return;
      }

      // Pastikan NIP tidak kosong
      if (!user.nip) {
        alert('NIP harus diisi');
        return;
      }

      const response = await axios.post('http://localhost:8080/api/users', user, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 201) {
        alert('User  berhasil ditambahkan');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">TAMBAH USER</p>

          <div className="mb-2">
            <label className="form-label">Nama*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="name"
              value={user.name}
              onChange={handleInputChange} // Event handler untuk menangani input
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">NIP*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="nip"
              value={user.nip}
              onChange={handleInputChange} // Event handler untuk menangani input
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Email*</label>
            <input
              type="email"
              className="form-control border border-dark"
              name="email"
              value={user.email}
              onChange={handleInputChange} // Event handler untuk menangani input
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Password*</label>
            <input
              type="password"
              className="form-control border border-dark"
              name="password"
              value={user.password}
              onChange={handleInputChange} // Event handler untuk menangani input
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">No Telp*</label>
            <input
              type="tel"
              className="form-control border border-dark"
              name="phone"
              value={user.phone}
              onChange={handleInputChange} // Event handler untuk menangani input
 required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Instansi*</label>
            <select
              name="agency_id"
              className="form-select border border-dark"
              value={user.agency_id}
              onChange={handleInputChange} // Event handler untuk menangani input
              required
            >
              <option value="">Pilih Instansi</option>
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Role*</label>
            <select
              name="role"
              className="form-select border border-dark"
              value={user.role}
              onChange={handleInputChange} // Event handler untuk menangani input
              required
            >
              <option value="">Pilih Role</option>
              <option value="admin">Admin</option>
              <option value="user">User </option>
              <option value="spectator">Spectator</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Tambah User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser ;