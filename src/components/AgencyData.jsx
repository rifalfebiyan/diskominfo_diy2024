import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AgencyData = () => {
  const { id } = useParams();
  const [agency, setAgency] = useState({});

  useEffect(() => {
    fetchAgencyData();
  }, []);

  const fetchAgencyData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/agencies/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAgency(response.data);
    } catch (error) {
      console.error('Error fetching agency data:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Detail Instansi</h4>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{agency.name}</h5>
          <p>
            <strong>Email:</strong> {agency.email}
          </p>
          <p>
            <strong>No Telepon:</strong> {agency.phone}
          </p>
          <p>
            <strong>Alamat:</strong> {agency.address}
          </p>
          <p>
            <strong>Tanggal dibuat:</strong> {new Date(agency.created_at).toLocaleDateString}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgencyData;
