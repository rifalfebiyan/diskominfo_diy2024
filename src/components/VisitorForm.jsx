import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VisitorForm() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    purpose: '',
    address: '',
    institution: '', // This will be set based on the user's agency
    phone: '',
    department: '',
    visitDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const agency = response.data.agency; // Get the agency object from the user data
        console.log('User agency:', agency); // Debugging
  
        if (agency) {
          setFormData(prev => ({
            ...prev,
            institution: agency.name // Set the agency name in the form data
          }));
          // Fetch departments only if agency.id exists
          if (agency.id) {
            fetchDepartments(agency.id);
          }
        } else {
          console.warn('No agency found for the user.');
        }
      } catch (error) {
        console.error('Error fetching user agency:', error);
      }
    };
  
    fetchData();
  }, []);
  

  // Fetch user's agency and departments
  const fetchUserAgency = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const agency = response.data.agency; // Get the agency object from the user data
      if (agency) {
        setFormData(prev => ({
          ...prev,
          institution: agency.name // Set the agency name in the form data
        }));
        fetchDepartments(agency.id); // Fetch departments based on the user's agency
      }
    } catch (error) {
      console.error('Error fetching user agency:', error);
    }
  };

  // Fetch departments based on the selected agency
  const fetchDepartments = async (agencyId) => {
    try {
      if (!agencyId) {
        console.warn('Agency ID is undefined.');
        return;
      }
      const response = await axios.get(`http://localhost:8080/api/departments?agency_id=${agencyId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Fetched departments for agency ID:', agencyId, response.data); // Debugging
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
            <input
              type="text"
              className="form-control border border-dark"
              name="institution"
              value={formData.institution}
              readOnly
            />
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
            <label className="form-label">Bidang Dituju*</label>
            <select
  name="department"
  className="form-select border border-dark"
  value={formData.department}
  onChange={handleChange}
  required
>
  <option value="">Pilih Bidang</option>
  {departments.length > 0 ? (
    departments.map((department) => (
      <option key={department.id} value={department.id}>
        {department.name}
      </option>
    ))
  ) : (
    <option value="" disabled>
      Tidak ada departemen tersedia
    </option>
  )}
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