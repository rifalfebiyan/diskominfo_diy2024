import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserPlus } from 'react-icons/fa';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [agencies, setAgencies] = useState([]);
  
  // State to hold the selected agency name
  const [showUsersTable, setShowUsersTable] = useState(true);
  const [showAgenciesTable, setShowAgenciesTable] = useState(true);
  
  const [isHovered, setIsHovered] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDepartments: 0,
    totalAgencies: 0,
  });

  useEffect(() => {
    fetchDepartments();
    fetchUsers();
    fetchAgencies();
    fetchStats();
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

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
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
      if (response.data.length > 0) {
      }
    } catch (error) {
      console.error('Error fetching agencies:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDeleteUser  = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.status === 200) {
          setUsers(users.filter(user => user.id !== id));
          fetchStats();
          alert('User  deleted successfully');
        } else {
          throw new Error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user: ' + error.message);
      }
    }
  };

  const handleEditDepartment = (id) => {
    navigate(`/edit-department/${id}`);
  };
  
  const handleAddDepartment = () => {
    navigate('/add-department');
  };

  const handleDeleteDepartment = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus bidang ini?')) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/departments/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.status === 200) {
          setDepartments(departments.filter(department => department.id !== id));
          alert('Departemen berhasil dihapus');
        }
      } catch (error) {
        console.error('Error deleting department:', error);
        alert('Gagal menghapus departemen: ' + error.message);
      }
    }
  };

  const handleDeleteAgency = async (id) => {
  if (window.confirm('Apakah Anda yakin ingin menghapus instansi ini?')) {
      try {
          const response = await axios.delete(`http://localhost:8080/api/agencies/${id}`, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
          });
          
          if (response.status === 200) {
              setAgencies(agencies.filter(agency => agency.id !== id));
              fetchStats();
              alert('Instansi berhasil dihapus');
          } else {
              throw new Error('Failed to delete agency');
          }
      } catch (error) {
          console.error('Error deleting agency:', error);
          alert('Gagal menghapus instansi: ' + (error.response?.data?.error || error.message));
      }
  }
};

  const handleShowUsers = () => {
    setShowUsersTable(!showUsersTable);
  };

  const handleShowAgencies = () => {
    setShowAgenciesTable(!showAgenciesTable);
  };

  return (
    <div className="container mt-4">
      <h4>Admin Dashboard</h4>
      <div className="row mb-4">
        <div className="col-md-3">
          <div
            className="card text-center shadow-sm mb-3"
            style={{
              backgroundColor: '#F8EDED',
              cursor: 'default',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="card-body">
              <h3>Jumlah Bidang</h3>
              <h1>{departments.length}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card text-center shadow-sm mb-3"
            style={{
              backgroundColor: '#F8EDED',
              cursor: 'pointer',
            }}
            onClick={handleShowAgencies}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="card-body">
              <h3>Jumlah Instansi</h3>
              <h1>{agencies.length}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div 
            className="card text-center shadow-sm mb-3" 
            style={{
              backgroundColor: '#F8EDED',
              cursor: 'pointer',
            }}
            onClick={handleShowUsers}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="card-body">
              <h3>Jumlah User</h3>
              <h1>{users.length}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <button className="btn btn-danger w-100 mb-3" onClick={() => navigate('/add-user')}>
            <FaUserPlus /> Tambah User
          </button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-danger w-100 mb-3" onClick={() => navigate('/add-agency')}>
            <FaUserPlus /> Tambah Instansi
          </button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-danger w-100 mb-3" onClick={() => navigate('/add-department')}>
            <FaUserPlus /> Tambah Bidang
          </button>
        </div>
      </div>

      {/* Tabel Instansi dengan kondisi showAgenciesTable */}
      {showAgenciesTable && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title">Daftar Instansi</h5> {/* Display agency name here */}
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>Id Instansi</th>
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
                      <td>{agency.id}</td>
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
                          onClick={() => handleDeleteAgency(agency.id)}
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
      )}

      {/* Tabel Pengguna dengan kondisi showUsersTable */}
      {showUsersTable && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title">Daftar Pengguna</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>NIP</th>
                    <th>Email</th>
                    <th>No Telepon</th>
                    <th>Role</th>
                    <th>Instansi ID</th>
                    <th>Instansi</th>
                    <th>Tanggal Dibuat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name || '-'}</td>
                      <td>{user.nip || '-'}</td>
                      <td>
                        <a 
                          href={`mailto:${user.email}`} 
                          style={{ color: '#9F2C2C' }}
                        >
                          {user.email || '-'}
                        </a>
                      </td>
                      <td>{user.phone || '-'}</td>
                      <td>{user.role || '-'}</td>
                      <td>{user.agency_id || '-'}</td>
                      <td>{user.agency ? user.agency.name : '-'}</td>
                      <td>
                        {user.created_at 
                          ? new Date(user.created_at).toLocaleDateString() 
                          : '-'}
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => navigate(`/edit-user/${user.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDeleteUser (user.id)}
                        >
                          Hapus
                        </button>
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => navigate(`/user-detail/${user.id}`)}
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
      )}
    </div>
  );
};

export default Admin;