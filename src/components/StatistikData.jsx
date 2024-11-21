import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import axios from 'axios';

function StatistikData() {
  const [visitors, setVisitors] = useState([]);
  const currentDate = new Date();

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/visitors', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Visitor Data:', response.data); // Debugging
        setVisitors(response.data);
      } catch (error) {
        console.error('Error fetching visitors:', error);
      }
    };

    fetchVisitors();
  }, []);
  
  // Helper functions to filter data by date
  const filterByDay = (date) => {
    return date && (new Date(date).toLocaleDateString() === currentDate.toLocaleDateString());
  };

  const filterByMonth = (date) => {
    return date && (
      new Date(date).getMonth() === currentDate.getMonth() &&
      new Date(date).getFullYear() === currentDate.getFullYear()
    );
  };

  const filterByYear = (date) => {
    return date && (new Date(date).getFullYear() === currentDate.getFullYear());
  };

  // Calculate totals for today, this month, and this year
  const totalVisitorsToday = visitors.filter((visitor) => filterByDay(visitor.visitDate)).length;
  const totalVisitorsMonth = visitors.filter((visitor) => filterByMonth(visitor.visitDate)).length;
  const totalVisitorsYear = visitors.filter((visitor) => filterByYear(visitor.visitDate)).length;

  // Prepare monthly statistics for the chart
  const monthlyVisitorCounts = new Array(12).fill(0);
  visitors.forEach((visitor) => {
    if (visitor.visitDate) {
      const visitDate = new Date(visitor.visitDate);
      const visitMonth = visitDate.getMonth();
      if (visitDate.getFullYear() === currentDate.getFullYear()) {
        monthlyVisitorCounts[visitMonth]++;
      }
    }
  });

  const monthlyData = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    datasets: [
      {
        label: 'Jumlah Kunjungan Bulanan',  
        data: monthlyVisitorCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">Data Statistik Kunjungan Dinas Kominfo</h3>
      
      <div className="row text-center my-4">
        <div className="col-md-4">
          <div className="p-3 bg-light rounded shadow-sm">
            <h5>Kunjungan Hari ini</h5>
            <h1 className="text-danger">{totalVisitorsToday}</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 bg-light rounded shadow-sm">
            <h5>Total Kunjungan Bulan Ini</h5>
            <h1 className="text-danger">{totalVisitorsMonth}</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 bg-light rounded shadow-sm">
            <h5>Total Kunjungan Tahun {currentDate.getFullYear ()}</h5>
            <h1 className="text-danger">{totalVisitorsYear}</h1>
          </div>
        </div>
      </div>

      <Card className="shadow-sm mb-5">
        <Card.Body>
          <Card.Title>Statistik Kunjungan Bulanan</Card.Title>
          <Bar data={monthlyData} options={{ responsive: true }} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default StatistikData;