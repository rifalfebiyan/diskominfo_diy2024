import React, { useState, useEffect, useCallback } from 'react'; // Mengimpor React dan hook yang diperlukan
import { useParams, useNavigate } from 'react-router-dom'; // Mengimpor hook untuk mendapatkan parameter URL dan navigasi
import axios from 'axios'; // Mengimpor axios untuk melakukan permintaan HTTP

const EditDepartment = () => {
  const { id } = useParams(); // Mengambil ID departemen dari URL
  const navigate = useNavigate(); // Hook untuk navigasi
  const [department, setDepartment] = useState({
    name: '',
    phone: '',
    address: '',
    status: '', // status akan diisi dengan "Active" atau "Non-Active"
    email: '',
    agency_id: '' // Menambahkan agency_id ke dalam state
  });
  const [agencies, setAgencies] = useState([]); // State untuk menyimpan daftar agensi

  // Mengambil data agensi dan departemen saat komponen dimuat
  useEffect(() => {
    fetchAgencies(); // Mengambil daftar agensi
    fetchDepartment(); // Mengambil data departemen berdasarkan ID
  }, []);

  // Fetch agencies from the backend
  const fetchAgencies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/agencies', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Menyertakan token otorisasi
        }
      });
      setAgencies(response.data); // Mengatur state agencies dengan data yang diambil
    } catch (error) {
      console.error('Error fetching agencies:', error); // Menangani kesalahan
    }
  };

  // Fetch department data based on ID
  const fetchDepartment = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/departments/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Menyertakan token otorisasi
        }
      });
      setDepartment(response.data); // Mengatur state department dengan data yang diambil
    } catch (error) {
      console.error('Error fetching department:', error); // Menangani kesalahan
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Mengambil nama dan nilai dari input
    setDepartment(prev => ({
      ...prev,
      [name]: name === 'agency_id' ? parseInt(value, 10) : value // Memperbarui state department
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    try {
      await axios.put(`http://localhost:8080/api/departments/${id}`, department, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Menyertakan token otorisasi
        }
      });
      alert('Departemen berhasil diperbarui'); // Menampilkan pesan sukses
      navigate('/admin'); // Mengarahkan kembali ke halaman admin
    } catch (error) {
      console.error('Error updating department:', error); // Menangani kesalahan
      alert('Gagal memperbarui departemen: ' + error.message); // Menampilkan pesan kesalahan
    }
  };

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">EDIT BIDANG</p>

          <div className="mb-2">
            <label htmlFor="name" className="form-label">Nama Bidang*</label>
            <input
              type="text"
              className="form-control border border-dark"
              id="name"
              name="name"
              value={department.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="phone" className="form-label">No Telepon*</label>
            <input
              type="tel"
              className="form-control border border-dark"
              id="phone"
              name="phone"
              value={department.phone}
              on Change={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="address" className="form-label">Alamat*</label>
            <input
              type="text"
              className="form-control border border-dark"
              id="address"
              name="address"
              value={department.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="status" className="form-label">Status*</label>
            <select
              className="form-select border border-dark"
              id="status"
              name="status"
              value={department.status}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Status</option>
              <option value="Active">Active</option>
              <option value="Non-Active">Non-Active</option>
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email*</label>
            <input
              type="email"
              className="form-control border border-dark"
              id="email"
              name="email"
              value={department.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="agency_id" className="form-label">Pilih Agency*</label>
            <select
              className="form-select border border-dark"
              id="agency_id"
              name="agency_id"
              value={department.agency_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Agency</option>
              {agencies.map(agency => (
                <option key={agency.id} value={agency.id}>{agency.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;