import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserPlus, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showDepartmentsTable, setShowDepartmentsTable] = useState(false);
  const [showUsersTable, setShowUsersTable] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDepartments: 0,
  });

  useEffect(() => {
    fetchDepartments();
    fetchUsers();
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
          fetchStats(); // Refresh stats after deletion
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
          fetchStats(); // Refresh stats after deletion
          alert('Department deleted successfully');
        } else {
          throw new Error('Failed to delete department');
        }
      } catch (error) {
        console.error('Error deleting department:', error);
        alert('Failed to delete department: ' + error.message);
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
       <h4>Admin Dashboard / Instansi / Data Instansi</h4>
      <div className="row mb-4">
      <div className="col-md-3">
          <div
            className="card text-center shadow-sm mb-3"
            style={{
              backgroundColor: '#F8EDED',
              cursor: 'pointer',
              // transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              // transition: 'transform 0.2s ease-in-out',
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
          <div className="card text-center shadow-sm mb-3" style={{ backgroundColor: '#F8EDED' }}>
            <div className="card-body">
              <h3>Jumlah User</h3>
              <h1>{users.length}</h1>
            </div>
          </div>
        </div>

        {/* BUTTON TAMBAH USER< INSTANSI, BIDANG */}
        <div className="col-md-30 d-flex justify-content-end">
        <button className="btn btn-danger mb-4" onClick={() => navigate('/add-department')}>
            <FaUserPlus /> Tambah Bidang
                </button>
                </div>
                </div>


      {/* Tampilkan tabel pengguna */}
    

      {/* Tampilkan tabel bidang */}
  
{/* 
      <div className="card shadow-sm"> */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Bidang Instansi</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
          <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>Nama Bidang</th>
                    <th>Alamat</th>
                    <th>No Telepon</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{department.name}</td>
                      <td>{department.address}</td>
                      <td>{department.phone}</td>
                      <td>{department.status}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => navigate(`/edit-department/${department.id}`)}
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
                    </ tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      </div>

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-4">
          <li className="page-item"><a className="page-link" href="#">Previous </a></li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li >
        </ul>
      </nav>
    </div>
  );
};

export default Admin;