import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function VisitorForm() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    purpose: '',
    address: '',
    institution: '',
    phone: '',
    department: '',
    visitDate: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const visitors = JSON.parse(localStorage.getItem('visitors')) || [];
    visitors.push(formData);
    localStorage.setItem('visitors', JSON.stringify(visitors));
    alert('Data submitted successfully');
    navigate('/');
  };

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}> {/* Set a max width and center */}
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">FORMULIR TAMU</p>

          <div className="mb-2">
            <label htmlFor="name" className="form-label">Nama*</label>
            <input
              type="text"
              name="name"
              className="form-control border border-dark" // Border around input
              placeholder="Nama"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="institution" className="form-label">Instansi*</label>
            <input
              type="text"
              name="institution"
              className="form-control border border-dark" // Border around input
              placeholder="Instansi"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="phone" className="form-label">No HP*</label>
            <input
              type="text"
              name="phone"
              className="form-control border border-dark" // Border around input
              placeholder="No HP"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="address" className="form-label">Alamat*</label>
            <textarea
              name="address"
              className="form-control border border-dark" // Border around textarea
              placeholder="Alamat"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="gender" className="form-label">Jenis Kelamin*</label>
            <select
              name="gender"
              className="form-select border border-dark" // Border around select
              onChange={handleChange}
              required
            >
              <option value="">Pilih</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="department" className="form-label">Bidang*</label>
            <select
              name="department"
              className="form-select border border-dark" // Border around select
              onChange={handleChange}
              required
            >
              <option value="">Pilih Bidang</option>
              <option value="Bidang IKP">Bidang IKP</option>
              <option value="Bidang HUMAS">Bidang HUMAS</option>
              <option value="Bidang APTIKA">Bidang APTIKA</option>
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="purpose" className="form-label">Keperluan*</label>
            <input
              type="text"
              name="purpose"
              className="form-control border border-dark" // Border around input
              placeholder="Keperluan"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="visitDate" className="form-label">Tanggal Kunjungan*</label>
            <input
              type="date"
              name="visitDate"
              className="form-control border border-dark" // Border around input
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">Simpan</button>
        </form>
      </div>
    </div>
  );
}

export default VisitorForm;
