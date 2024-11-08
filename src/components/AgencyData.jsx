import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AgencyData = () => {
  const { id } = useParams();
  const [agency, setAgency] = useState({});
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgencyData();
  }, [id]);

  const fetchAgencyData = async () => {
    try {
      setLoading(true);
      // Fetch agency data
      const agencyResponse = await axios.get(`http://localhost:8080/api/agencies/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAgency(agencyResponse.data);

      // Fetch departments data
      const departmentsResponse = await axios.get('http://localhost:8080/api/departments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Filter departments for this agency
      const agencyDepartments = departmentsResponse.data.filter(
        dept => dept.agency_id === parseInt(id)
      );
      setDepartments(agencyDepartments);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-agency/${id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Detail Instansi</h4>
      
      {/* Agency Details Card */}
      <div className="card mb-4">
        <div className="card-header bg-danger text-white">
          <h5 className="card-title mb-0">{agency.name}</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>Email:</strong> {agency.email || 'N/A'}</p>
              <p><strong>No Telepon:</strong> {agency.phone || 'N/A'}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Alamat:</strong> {agency.address || 'N/A'}</p>
              <p><strong>Tanggal dibuat:</strong> {agency.created_at ? new Date(agency.created_at).toLocaleDateString('id-ID') : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Departments Table */}
      <div className="card mb-4">
        <div className="card-header bg-danger text-white">
          <h5 className="card-title mb-0">Daftar Bidang</h5>
        </div>
        <div className="card-body">
          {departments.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>Nama Bidang</th>
                    <th>Email</th>
                    <th>No Telp</th>
                    <th>Alamat</th>
                    <th>Tanggal Dibuat</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department, index) => (
                    <tr key={department.id}>
                      <td>{index + 1}</td>
                      <td>{department.name}</td>
                      <td>{department.email || '-'}</td>
                      <td>{department.phone}</td>
                      <td>{department.address}</td>
                      <td>{new Date(department.created_at).toLocaleDateString('id-ID')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center mb-0">Tidak ada bidang yang terdaftar</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-2">
        <button className="btn btn-danger" onClick={handleEdit}>Edit</button>
        <button className="btn btn-secondary" onClick={handleBack}>Kembali</button>
      </div>
    </div>
  );
};

export default AgencyData;