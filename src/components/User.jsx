import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserPlus } from 'react-icons/fa';

const User = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDepartmentsTable, setShowDepartmentsTable] = useState(true);
  const [showUsersTable, setShowUsersTable] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDepartments: 0,
    totalAgencies: 0,
  });

  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
    fetchAgencies();
    fetchStats();
  }, []);

   // Tambahkan useEffect untuk memfilter users ketika users berubah
   useEffect(() => {
    if (currentUser && currentUser.agency) {
      const filteredUsers = users.filter(user => 
        user.agency_id === currentUser.agency.id
      );
      setFilteredUsers(filteredUsers);
    }

  }, [users, currentUser]);
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

  // Fetch current user data
  const fetchCurrentUser = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const userData = response.data;
      console.log('User Data:', userData);
      setCurrentUser(userData);

      // Fetch departments berdasarkan agency dari user
      const agency = userData.agency;
      if (agency && agency.id) {
        fetchDepartments(agency.id);
      } else {
        console.warn('No agency found for the user');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      alert('Gagal mengambil data pengguna: ' + error.message);
    }
  };

  // Fetch departments berdasarkan agency ID
  const fetchDepartments = async (agencyId) => {
    try {
      if (!agencyId) {
        console.warn('Agency ID is undefined.');
        return;
      }
  
      // Gunakan query parameter untuk filter departments
      const response = await axios.get(`http://localhost:8080/api/departments?agency_id=${agencyId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });


      // Debug: tambahkan log untuk memeriksa response
      console.log('Fetched departments:', response.data);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      alert('Gagal mengambil departemen: ' + error.message);
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

  const handleDeleteUser = async (id) => {
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
          alert('User deleted successfully');
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

  const handleShowDepartments = () => {
    setShowDepartmentsTable(!showDepartmentsTable);
  };

  const handleShowUsers = () => {
    setShowUsersTable(!showUsersTable);
  };

  return (
    <div className="container mt-4">
      <h4>User Dashboard</h4>
      <div className="row mb-4 justify-content-center">
        <div className="col-md-3">
          <div
            className="card text-center shadow-sm mb-3"
            style={{
              backgroundColor: '#F8EDED',
              cursor: 'pointer',
            }}
            onClick={handleShowDepartments}
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
      </div>

      {/* Baris untuk tombol tambah user dan tambah bidang */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-4">
          <button className="btn btn-danger w-100 mb-3" onClick={() => navigate('/add-user')}>
            <FaUserPlus /> Tambah User
          </button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-danger w-100 mb-3" onClick={handleAddDepartment}>
            <FaUserPlus /> Tambah Bidang
          </button>
        </div>
      </div>

      {showDepartmentsTable && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title">
              {currentUser  && currentUser .agency ? 
                `Daftar Departemen ${currentUser ?.agency.name}` : 
                'Loading...'}
            </h5>
          </div>
          <div className="card-body">
           {/* untuk melihat informasi debugg */}
            
              
              {/* <strong>Debug Informasi:</strong>
              <p>Current User Agency ID: {currentUser ?.agency_id}</p>
              <p>Current User Agency Name: {currentUser ?.agency?.name}</p>
              <p>Departments Count: {departments.length}</p> */}
              {departments.length === 0 && (
                <p className="text-danger">
                  Tidak ada departemen ditemukan. Periksa konfigurasi backend.
                </p>
              )}
            

            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>No Telepon</th>
                  <th>Alamat</th>
                  <th>Status</th>
                  <th>Email</th>
                  <th>Agency ID</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {departments.length > 0 ? (
                  departments.map((department, index) => (
                    <tr key={department.id}>
                      <td>{index + 1}</td>
                      <td>{department.name || 'Tidak ada nama'}</td>
                      <td>{department.phone || 'Tidak ada nomor telepon'}</td>
                      <td>{department.address || 'Tidak ada alamat'}</td>
                      <td>{department.status || 'Tidak ada status'}</td>
                      <td>{department.email || 'Tidak ada email'}</td>
                      <td>{department.agency_id}</td>
                      <td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Tidak ada departemen yang terdaftar
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

{showUsersTable && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title">
              Daftar Pengguna {currentUser?.agency?.name ? `- ${currentUser.agency.name}` : ''}
            </h5>
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
                    <th>Instansi</th>
                    <th>Tanggal Dibuat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
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
                      <td>{user.agency ? user.agency.name : '-'}</td>
                      <td>
                        {user.created_at 
                          ? new Date(user.created_at).toLocaleDateString() 
                          : '-'}
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => navigate(`/users/edit/${user.id}`)}
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

export default User;