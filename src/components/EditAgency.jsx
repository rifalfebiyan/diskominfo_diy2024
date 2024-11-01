import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditAgency = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agency, setAgency] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/agencies/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAgency(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch agency data');
        setLoading(false);
      }
    };

    fetchAgency();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgency(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/agencies/${id}`, agency, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Agency updated successfully');
      navigate('/agency');
    } catch (err) {
      setError('Failed to update agency');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">EDIT INSTANSI</p>

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

          <button type="submit" className="btn btn-danger w-100">Simpan Perubahan</button>
        </form>
      </div>
    </div>
  );
};

export default EditAgency;
