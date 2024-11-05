// src/components/SpectatorDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpectatorDashboard = () => {
  const [visitors, setVisitors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    fetchDepartments();
    fetchVisitors();
    fetchAgencies();
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

  const fetchVisitors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/visitors', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setVisitors(response.data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
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

  return (
    <div className="container mt-4">
      <h4>Dashboard Pengunjung</h4>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm mb-3">
            <div className="card-body">
              <h3>Jumlah Bidang</h3>
              <h1>{departments.length}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm mb-3">
            <div className="card-body">
              <h3>Jumlah Instansi</h3>
              <h1>{agencies.length}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm mb-3">
            <div className="card-body">
              <h3>Jumlah Tamu</h3>
              <h1>{visitors.length}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Bidang */}
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
                    <td>{new Date(department.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tabel Instansi */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title">Daftar Instansi</h5>
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
                </tr>
              </thead>
              <tbody>
                {agencies.map((agency, index) => (
                  <tr key={agency.id}>
                    <td>{index + 1}</td>
                    <td>{agency.name}</td>
                    <td>{agency.email}</td>
                    <td>{agency.phone}</td>
                    <td>{agency.address}</td>
                    <td>{new Date(agency.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tabel Tamu */}
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
                  <th>Institusi</th>
                  <th>Keperluan</th>
                  <th>Bidang yang Dituju</th>
                  <th>Tanggal Kunjungan</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor, index) => (
                  <tr key={visitor.id}>
                    <td>{index + 1}</td>
                    <td>{visitor.name}</td>
                    <td>{visitor.institution}</td>
                    <td>{visitor.purpose}</td>
                    <td>{visitor.department}</td>
                    <td>{new Date(visitor.visit_date).toLocaleDateString()}</td>
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

export default SpectatorDashboard;