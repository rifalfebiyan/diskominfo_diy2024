import React, { useState, useEffect } from 'react'; // Tambahkan useEffect di sini
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function VisitorForm() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    purpose: '',
    address: '',
    institution: '',
    phone: '',
    department: '',
    visitDate: new Date().toISOString().split('T')[0]
  });

  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/departments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mendapatkan token dari localStorage
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:8080/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '' // Gunakan token jika ada
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Response data:", data);
      alert('Data submitted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data: ' + error.message);
    }
  };

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">FORMULIR TAMU</p>

          <div className="mb-2">
            <label htmlFor="name" className="form-label">Nama*</label>
            <input
              type="text"
              name="name"
              className="form-control border border-dark"
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
              className="form-control border border-dark"
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
              className="form-control border border-dark"
              placeholder="No HP"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="address" className="form-label">Alamat*</label>
            <textarea
              name="address"
              className="form-control border border-dark"
              placeholder="Alamat"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="gender" className="form-label">Jenis Kelamin*</label>
            <select
              name="gender"
              className="form-select border border-dark"
              onChange={handleChange}
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="department" className="form-label">Bidang*</label>
            <select
              name="department"
              className="form-select border border-dark"
              onChange={handleChange}
              required
            >
              <option value="">Pilih Bidang</option>
              {departments.map((dept) => (
                dept.status === 'Active' && (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                )
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="visitDate" className="form-label">Tanggal Kunjungan*</label>
            <input
              type="datetime-local"
              name="visitDate"
              className="form-control border border-dark"
              value={formData.visitDate}
              onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="purpose" className="form-label">Keperluan*</label>
            <textarea
              name="purpose"
              className="form-control border border-dark"
              placeholder="Keperluan"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default VisitorForm;
