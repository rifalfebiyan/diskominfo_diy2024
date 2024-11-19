import React, { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [user, setUser ] = useState({
    name: '',
    nip: '',
    email: '',
    password: '',
    phone: '',
    agency_id: '',
    role: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser (prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/register', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        alert('User  berhasil terdaftar');
        // Redirect atau lakukan tindakan lain setelah registrasi berhasil
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Gagal mendaftar: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">REGISTRASI</p>

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

          <div className="mb-2">
            <label className="form-label">NIP*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="nip"
              value={user.nip}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Instansi*</label>
            <select
              name="agency_id"
              className="form-select border border-dark"
              value={user.agency_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Instansi</option>
              {/* Tambahkan opsi instansi di sini */}
            </select>
          </div>

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
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Daftar</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;