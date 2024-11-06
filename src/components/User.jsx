import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import axios from 'axios';

const User = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [showDepartmentsTable, setShowDepartmentsTable] = useState(false);
  const [showVisitorsTable, setShowVisitorsTable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthorization();
    fetchDepartments();
    fetchVisitors();
  }, []);

  const checkAuthorization = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (!token || userRole !== 'user') {
      navigate('/login');
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/departments', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      setDepartments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setError('Failed to fetch departments');
      setLoading(false);
    }
  };

  const fetchVisitors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/visitors', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      setVisitors(response.data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
      setError('Failed to fetch visitors');
    }
  };

  const handleShowDepartments = () => setShowDepartmentsTable(!showDepartmentsTable);
  const handleShowVisitors = () => setShowVisitorsTable(!showVisitorsTable);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h4>User Dashboard</h4>
      <div className="row mb-4 justify-content-center"> {/* Tambahkan justify-content-center */}
        <div className="col-md-4">
          <div
            className="card text-center shadow-sm mb-3"
            style={{ backgroundColor: '#F8EDED', cursor: 'pointer' }}
            onClick={handleShowDepartments}
          >
            <div className="card-body">
              <h3>Jumlah Bidang</h3>
              <h1>{departments.length}</h1>
            </div>
          </div>
          <button
            className="btn btn-danger w-100 mb-3"
            onClick={() => navigate('/add-department')}
          >
            <FaUserPlus /> Tambah Bidang
          </button>
        </div>

        <div className="col-md-4">
          <div
            className="card text-center shadow-sm mb-3"
            style={{ backgroundColor: '#F8EDED', cursor: 'pointer' }}
            onClick={handleShowVisitors}
          >
            <div className="card-body">
              <h3>Jumlah Tamu</h3>
              <h1>{visitors.length}</h1>
            </div>
          </div>
          <button
            className="btn btn-danger w-100 mb-3"
            onClick={() => navigate('/add')}
          >
            <FaUserPlus /> Tambah Tamu
          </button>
        </div>
      </div>

      {showDepartmentsTable && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title">Daftar Bidang</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>Nama Bidang</th>
                    <th>No Telp</th>
                    <th>Alamat</th>
                    <th>Tanggal dibuat</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department, index) => (
                    <tr key={department.id}>
                      <td>{index + 1}</td>
                      <td>{department.name}</td>
                      <td>{department.phone}</td>
                      <td>{department.address}</td>
                      <td>{new Date(department.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {showVisitorsTable && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title">Daftar Tamu</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>Nama Tamu</th>
                    <th>Tujuan</th>
                    <th>Tanggal Kunjungan</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((visitor, index) => (
                    <tr key={visitor.id}>
                      <td>{index + 1}</td>
                      <td>{visitor.name}</td>
                      <td>{visitor.purpose}</td>
                      <td>{new Date(visitor.visitDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
