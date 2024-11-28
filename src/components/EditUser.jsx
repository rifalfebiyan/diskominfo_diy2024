import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditUser  = () => {
  const [user, setUser ] = useState({
    name: '',
    nip: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    agency_id: ''
  });
  const [agencies, setAgencies] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser  = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser (response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
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

    fetchUser ();
    fetchAgencies();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser (prev => ({
      ...prev,
      [name]: name === 'agency_id' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Data yang akan disimpan:', user); // Debugging untuk memeriksa NIP

    // Validasi input
    if (!user.name || !user.nip || !user.phone || !user.email || !user.agency_id) {
      alert('Semua field harus diisi!');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/users/${id}`, user, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Response dari server:', response.data); // Debugging
      alert('User  berhasil diperbarui');
      navigate(`/admin`);
    } catch (error) {
      console.error('Error updating user:', error); // Debugging
      alert('Gagal memperbarui user: ' + error.message);
    }
  };

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">EDIT USER</p>

          {/* Name Input */}
          <div className="mb-2">
            <label className="form-label">Nama*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* NIP Input */}
          <div className="mb-2">
            <label className="form-label">NIP*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="nip"
              value={user.nip} // Pastikan ini terhubung dengan state
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-2">
            <label className="form-label">Email*</label>
            <input
              type="email"
              className="form-control border border-dark"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Phone Input */}
          <div className="mb-2">
            <label className="form-label">No Telp*</label>
            <input
              type="tel"
              className="form-control border border-dark"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-2">
            <label className="form-label">Password*</label>
            <input
              type="password"
              className="form-control border border-dark"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Role Input */}
          <div className="mb-2">
            <label className="form-label">Role*</label>
            <select
              className="form-select border border-dark"
              name="role"
              value={user.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Role</option>
              <option value="admin">Admin</option>
              <option value="user">User </option>
              <option value="spectator">Spectator</option>
            </select>
          </div>

          {/* Agency Selection */}
          <div className="mb-2">
            <label htmlFor="agency_id" className="form-label">Pilih Agency*</label>
            <select
              className="form-select border border-dark"
              id="agency_id"
              name="agency_id"
              value={user.agency_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Agency</option>
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary mt-3">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser ;