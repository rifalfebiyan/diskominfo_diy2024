import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VisitorForm() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    purpose: '',
    address: '',
    institution: '',
    phone: '',
    department: '',
    visitDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchDepartments();
    fetchAgencies();
  }, []);

  // Fetch departments
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

  // Fetch agencies
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

  // Handle agency selection
  const handleAgencyChange = (e) => {
    const selectedAgencyId = e.target.value;
    setSelectedAgency(selectedAgencyId);
    setFormData(prev => ({
      ...prev,
      institution: e.target.options[e.target.selectedIndex].text
    }));

    // Filter departments based on selected agency
    const filtered = departments.filter(
      dept => dept.agency_id === parseInt(selectedAgencyId)
    );
    setFilteredDepartments(filtered);
    // Reset department selection
    setFormData(prev => ({
      ...prev,
      department: ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'visitDate') {
      try {
        const date = new Date(value + 'T00:00:00Z');
        if (!isNaN(date.getTime())) {
          setFormData({
            ...formData,
            [name]: date.toISOString().split('T')[0]
          });
        }
      } catch (error) {
        console.error('Invalid date:', error);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requiredFields = ['name', 'gender', 'purpose', 'address', 'institution', 'phone', 'department', 'visitDate'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
  
    try {
      const submitData = {
        ...formData,
        visitDate: new Date(formData.visitDate + 'T00:00:00Z').toISOString()
      };
  
      const token = localStorage.getItem('token');
      console.log('Sending data:', submitData);
      
      const response = await axios.post('http://localhost:8080/api/visitors', submitData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log('Response:', response.data);
      alert('Data berhasil disimpan!');
      navigate('/guest');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">FORM TAMU</p>

          <div className="mb-2">
            <label className="form-label">Nama*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Jenis Kelamin*</label>
            <select
              name="gender"
              className="form-select border border-dark"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Keperluan*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Alamat*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Instansi*</label>
            <select
              name="institution"
              className="form-select border border-dark"
              value={selectedAgency}
              onChange={handleAgencyChange}
              required
            >
              <option value="">Pilih Instansi</option>
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">No. Telepon*</label>
            <input
              type="tel"
              className="form-control border border-dark"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Departemen*</label>
            <select
              name="department"
              className="form-select border border-dark"
              value={formData.department}
              onChange={handleChange}
              required
              disabled={!selectedAgency}
            >
              <option value="">Pilih Bidang</option>
              {filteredDepartments.map((department) => (
                <option key={department.id} value={department.name}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Tanggal Kunjungan*</label>
            <input
              type="date"
               className="form-control border border-dark"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">
          Simpan
        </button>
        </form>
      </div>
    </div>
  );
}

export default VisitorForm;