import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from './Loader'; // Import Loader

function EditVisitor() {
  const { index } = useParams();
  const [visitor, setVisitor] = useState({
    name: '',
    gender: '',
    purpose: '',
    address: '',
    institution: '',
    phone: '',
    department: '',
  });
  const [loading, setLoading] = useState(true); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    const storedVisitors = JSON.parse(localStorage.getItem('visitors')) || [];
    if (storedVisitors[index]) {
      setVisitor(storedVisitors[index]);
    }
    setLoading(false); // Set loading to false after data is retrieved
  }, [index]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisitor((prevVisitor) => ({
      ...prevVisitor,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const storedVisitors = JSON.parse(localStorage.getItem('visitors')) || [];
    storedVisitors[index] = visitor;
    localStorage.setItem('visitors', JSON.stringify(storedVisitors));
    navigate('/'); // Navigate back to the visitor list page after saving
  };

  if (loading) {
    return <Loader />; // Show Loader while loading
  }

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}> {/* Set a max width and center */}
        <form onSubmit={handleSave}>
          <p className="fw-bold text-center">EDIT DATA TAMU</p>

          <div className="mb-2">
            <label className="form-label">Nama*</label>
            <input
              type="text"
              className="form-control border border-dark" // Border around input
              name="name"
              value={visitor.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Jenis Kelamin*</label>
            <select
              name="gender"
              className="form-select border border-dark" // Border around select
              value={visitor.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Keperluan*</label>
            <input
              type="text"
              className="form-control border border-dark" // Border around input
              name="purpose"
              value={visitor.purpose}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Alamat*</label>
            <textarea
              className="form-control border border-dark" // Border around textarea
              name="address"
              value={visitor.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Instansi*</label>
            <input
              type="text"
              className="form-control border border-dark" // Border around input
              name="institution"
              value={visitor.institution}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">No Telp*</label>
            <input
              type="tel"
              className="form-control border border-dark" // Border around input
              name="phone"
              value={visitor.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Bidang*</label>
            <select
              name="department"
              className="form-select border border-dark" // Border around select
              value={visitor.department}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Bidang</option>
              <option value="Bidang IKP">Bidang IKP</option>
              <option value="Bidang HUMAS">Bidang HUMAS</option>
              <option value="Bidang APTIKA">Bidang APTIKA</option>
            </select>
          </div>

          <button type="submit" className="btn btn-danger w-100">Simpan</button>
        </form>
      </div>
    </div>
  );
}

export default EditVisitor;
