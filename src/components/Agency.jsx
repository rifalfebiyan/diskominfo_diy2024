import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserPlus } from 'react-icons/fa';

const Agency = () => {
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState([]);
  const [stats, setStats] = useState({
    totalAgencies: 0
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
      setStats({ totalAgencies: response.data.length });
    } catch (error) {
      console.error('Error fetching agencies:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus instansi ini?')) {
      try {
        await axios.delete(`http://localhost:8080/api/agencies/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        fetchAgencies(); // Refresh data
        alert('Instansi berhasil dihapus');
      } catch (error) {
        console.error('Error deleting agency:', error);
        alert('Gagal menghapus instansi');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h4>Admin Dashboard / Instansi</h4>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center shadow-sm mb-3" style={{ backgroundColor: '#F8EDED' }}>
            <div className="card-body">
              <h3>Jumlah Instansi</h3>
              <h1>{stats.totalAgencies}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-30 d-flex justify-content-end">
          <button className="btn btn-danger mb-4" onClick={() => navigate('/add-agency')}>
            <FaUserPlus /> Tambah Instansi
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Instansi</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>No</th>
                  <th>Nama Instansi</th>
                  <th>Email</th>
                  <th>No Telp</th>
                  <th>Alamat</th>
                  <th>Tanggal dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {agencies.map((agency, index) => (
                  <tr key={agency.id}>
                    <td>{index + 1}</td>
                    <td>{agency.name}</td>
                    <td><a href={`mailto:${agency.email}`} style={{ color: '#9F2C2C' }}>{agency.email}</a></td>
                    <td>{agency.phone}</td>
                    <td>{agency.address}</td>
                    <td>{new Date(agency.created_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => navigate(`/edit-agency/${agency.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => handleDelete(agency.id)}
                      >
                        Hapus
                      </button>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => navigate(`/agency-data/${agency.id}`)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agency;
