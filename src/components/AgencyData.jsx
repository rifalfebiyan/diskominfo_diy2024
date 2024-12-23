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
      const agencyResponse = await axios.get(`http://localhost:8080/api/agencies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAgency(agencyResponse.data);

      const departmentsResponse = await axios.get('http://localhost:8080/api/departments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const agencyDepartments = departmentsResponse.data.filter(
        (dept) => dept.agency_id === parseInt(id)
      );
      setDepartments(agencyDepartments);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
      setLoading(false);
    }
  };

  const handleEditDepartment = (deptId) => {
    navigate(`/edit-department/${deptId}`);
  };

  const handleDeleteDepartment = async (deptId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus bidang ini?')) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/departments/${deptId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.status === 200) {
          setDepartments(departments.filter((department) => department.id !== deptId));
          alert('Departemen berhasil dihapus');
        }
      } catch (error) {
        console.error('Error deleting department:', error);
        alert('Gagal menghapus departemen: ' + error.message);
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-primary">Detail Instansi</h2>

      {/* Agency Details Card */}
      <div className="card shadow-sm border-0 mb-5">
      <div className="card-header" style={{ backgroundColor: '#A83427', color: 'white' }}>
          <h5 className="card-title mb-0">{agency.name}</h5>
        </div>
        <div className="card-body">
          <p><strong>Email:</strong> {agency.email || 'N/A'}</p>
          <p><strong>No Telepon:</strong> {agency.phone || 'N/A'}</p>
          <p><strong>Alamat:</strong> {agency.address || 'N/A'}</p>
          <p><strong>Jumlah Bidang:</strong> {departments.length || 'N/A'}</p>
          <p><strong>Tanggal Dibuat:</strong> {agency.created_at ? new Date(agency.created_at).toLocaleDateString('id-ID') : 'N/A'}</p>
        </div>
      </div>

      {/* Departments Table */}
      <div className="card shadow-sm border-0 mb-4">
      <div className="card-header" style={{ backgroundColor: '#A83427', color: 'white' }}>
          <h5 className="card-title mb-0">Daftar Bidang</h5>
        </div>
        <div className="card-body">
          {departments.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama Bidang</th>
                    <th scope="col">Email</th>
                    <th scope="col">No Telepon</th>
                    <th scope="col">Alamat</th>
                    <th scope="col">Status</th>
                    <th scope="col">Tanggal Dibuat</th>
                    <th scope="col">Aksi</th>
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
                      <td>{department.status}</td>
                      <td>{new Date(department.created_at).toLocaleDateString('id-ID')}</td>
                      <td className="d-flex justify-content-end">
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditDepartment(department.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteDepartment(department.id)}
                      >
                        Hapus
                      </button>
</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted">Tidak ada bidang yang terdaftar.</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-between">
      <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Kembali
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/add-department')}
        >
          Tambah Bidang
        </button>
      </div>
    </div>
  );
};

export default AgencyData;
