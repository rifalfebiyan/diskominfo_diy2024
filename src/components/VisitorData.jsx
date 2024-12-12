import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VisitorData() {
  const [visitors, setVisitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [visitorsPerPage, setVisitorsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const userResponse = await axios.get(`http://localhost:8080/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const userData = userResponse.data;
        console.log('User Data:', userData);
        setCurrentUser(userData);

        // Pastikan agency tersedia
        if (!userData.agency || !userData.agency.name) {
          console.error('No agency found for user');
          setLoading(false);
          return;
        }

        // Fetch departments untuk agency ini
        const departmentsResponse = await axios.get(`http://localhost:8080/api/departments?agency_id=${userData.agency.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setDepartments(departmentsResponse.data);

        // Fetch visitors untuk agency ini
        const visitorsResponse = await axios.get(`http://localhost:8080/api/visitors`, {
          params: { 
            institution: userData.agency.name 
          },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        console.log('Visitors Response:', visitorsResponse.data);
        setVisitors(visitorsResponse.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        alert('Gagal mengambil data: ' + error.message);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDepartmentFilter = (e) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = () => {
    const sortedVisitors = [...visitors].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setVisitors(sortedVisitors);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '-' : new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const filteredVisitors = visitors.filter((visitor) => {
    return (
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDepartment ? visitor.department === selectedDepartment : true) &&
      // Tambahkan filter untuk instansi
      visitor.institution === currentUser?.agency?.name
    );
  });

  const indexOfLastVisitor = currentPage * visitorsPerPage;
  const indexOfFirstVisitor = indexOfLastVisitor - visitorsPerPage;
  const currentVisitors = filteredVisitors.slice(indexOfFirstVisitor, indexOfLastVisitor);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredVisitors.length / visitorsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-visitor/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data tamu ini?')) {
      try {
        await axios.delete(`http://localhost:8080/api/visitors/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        setVisitors(visitors.filter(visitor => visitor.id !== id));
        alert('Data tamu berhasil dihapus');
      } catch (error) {
        console.error('Error deleting visitor:', error);
        alert('Gagal menghapus data tamu');
      }
    }
  };

  const handleRowsPerPageChange = (e) => {
    setVisitorsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <h5 className="position-absolute" style={{ top: 0, left: 0, margin: '10px' }}>
        Data Tamu / Edit Tamu - {currentUser?.agency?.name || 'Instansi Tidak Diketahui'}
      </h5>

      <h5>Data Tamu</h5>
      <div className="row mb-3">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Cari nama pengunjung..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-6 col-md-3 mb-2 mb-md-0">
          <select
            name="department"
            className="form-select border border-dark"
            value={selectedDepartment}
            onChange={handleDepartmentFilter}
            required
          >
            <option value="">Pilih Bidang</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-3 mb-2 mb-md-0 d-flex">
          <button className="btn btn-primary me-2" onClick={handleSort}>
            Sortir Nama A-Z {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
          <button className="btn btn-success" onClick={() => navigate('/add-visitor')}>Tambah Tamu</button>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Tampilkan Baris:</label>
        <select className="form-select form-select-sm" value={visitorsPerPage} onChange={handleRowsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Daftar Pengunjung</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Nama</th>
                  <th>Instansi</th>
                  <th>No HP</th>
                  <th>Alamat</th>
                  <th>Jenis Kelamin</th>
                  <th>Bidang</th>
                  <th>Keperluan</th>
                  <th>Tanggal Kunjungan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentVisitors.map((visitor, index) => (
                  <tr key={visitor.id}>
                    <td>{indexOfFirstVisitor + index + 1}</td>
                    <td>{visitor.name}</td>
                    <td>{visitor.institution}</td>
                    <td>{visitor.phone}</td>
                    <td>{visitor.address}</td>
                    <td>{visitor.gender}</td>
                    <td>{visitor.department}</td>
                    <td>{visitor.purpose}</td>
                    <td>{formatDate(visitor.visitDate)}</td>
                    <td>
                      <div className="d-flex">
                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(visitor.id)}>
                          Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(visitor.id)}>
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePreviousPage}>Previous</button>
          </li>
          <li className="page-item">
            <span className="page-link">{currentPage}</span>
          </li>
          <li className={`page-item ${currentPage === Math.ceil(filteredVisitors.length / visitorsPerPage) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNextPage}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default VisitorData;
