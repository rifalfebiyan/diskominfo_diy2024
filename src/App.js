import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import VisitorForm from './components/VisitorForm';
import VisitorData from './components/VisitorData';
import Footer from './components/Footer';
import Loader from './components/Loader';
import StatistikData from './components/StatistikData';
import MiniSidebar from './components/MiniSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import EditVisitor from './components/EditVisitor';
import Admin from './components/Admin'; // Impor halaman Admin
import AddUser from './components/AddUser'; // Impor halaman tambah user
import AddDepartment from './components/AddDepartment'; // Impor halaman tambah bidang

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fungsi untuk menangani login
  const handleLogin = (status, role) => {
    setIsLoggedIn(status);
    if (status) {
      localStorage.setItem('role', role); // Simpan role di localStorage
      setLoading(true);

      // Navigasi berdasarkan role
      if (role === 'admin') {
        navigate('/admin'); // Jika admin, ke halaman admin
      } else {
        navigate('/'); // Jika user biasa, ke halaman statistik
      }
      setLoading(false);
    }
  };

  // Fungsi untuk logout
  const handleLogout = () => {
    setLoading(true);
    setIsLoggedIn(false);
    localStorage.removeItem('role'); // Hapus role saat logout
    navigate('/login');
    setLoading(false);
  };

  // Fungsi untuk navigasi manual
  const handleNavigation = (path) => {
    setLoading(true);
    navigate(path);
    setLoading(false);
  };

  // Cek apakah role pengguna adalah admin
  const isAdmin = () => {
    const role = localStorage.getItem('role');
    return role === 'admin'; // Hanya izinkan admin
  };

  // Komponen Route khusus untuk admin
  const AdminRoute = ({ children }) => {
    return isAdmin() ? children : <Navigate to="/" />; // Jika bukan admin, redirect ke home
  };

  return (
    <div className="d-flex">
      {isLoggedIn && <MiniSidebar onLogout={handleLogout} />}
      <div className="d-flex flex-column min-vh-100 flex-grow-1">
        {isLoggedIn && <Header onLogout={handleLogout} />}
        {isLoggedIn && (
          <marquee className="py-2 text-dark">
            Selamat Datang di Buku Tamu Dinas Komunikasi dan Informasi Daerah Istimewa Yogyakarta
          </marquee>
        )}
        <div className="container-fluid flex-grow-1 p-0">
          {!isLoggedIn ? (
            <Login onLogin={handleLogin} />
          ) : (
            <div>
              <Routes>
                {/* Rute ke halaman utama */}
                <Route path="/" element={<StatistikData onNavigate={handleNavigation} />} />

                {/* Rute untuk data visitor */}
                <Route path="/guest" element={<VisitorData />} />

                {/* Rute untuk tambah visitor */}
                <Route path="/add" element={<VisitorForm onNavigate={handleNavigation} />} />

                {/* Rute untuk edit visitor */}
                <Route path="/edit/:index" element={isLoggedIn ? <EditVisitor /> : <Navigate to="/login" />} />

                {/* Halaman admin yang dilindungi */}
                <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} /> {/* Admin Page */}

                {/* Rute untuk tambah user dan bidang */}
                <Route path="/add-user" element={<AdminRoute><AddUser /></AdminRoute>} />
                <Route path="/add-department" element={<AdminRoute><AddDepartment /></AdminRoute>} />
              </Routes>
            </div>
          )}
        </div>
        {isLoggedIn && <Footer />}
        {loading && <Loader />}
      </div>
    </div>
  );
}

export default App;
