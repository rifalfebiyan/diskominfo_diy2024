import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DepartmentData = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({});
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartmentData();
    fetchDepartmentVisitors();
  }, [id]);

  const fetchDepartmentData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/departments/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDepartment(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching department data:', error);
      setError('Failed to fetch department data');
      setLoading(false);
    }
  };

  const fetchDepartmentVisitors = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/departments/${id}/visitors`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setVisitors(response.data);
    } catch (error) {
      console.error('Error fetching department visitors:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-department/${id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Detail Bidang</h4>
      
      {/* Department Details Card */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="card-title mb-0">{department.name}</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>No Telepon:</strong> {department.phone || 'N/A'}</p>
              <p><strong>Email:</strong> {department.email || 'N/A'}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Alamat:</strong> {department.address || 'N/A'}</p>
              <p><strong>Instansi:</strong> {department.agency?.name || 'N/A'}</p>
              <p><strong>Tanggal dibuat:</strong> {department.created_at ? new Date(department.created_at).toLocaleDateString('id-ID') : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
        <button className="btn btn-secondary" onClick={handleBack}>Kembali</button>
      </div>
    </div>
  );
};

export default DepartmentData;