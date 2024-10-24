import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import VisitorForm from './components/VisitorForm';
import VisitorData from './components/VisitorData';
import Footer from './components/Footer';
import Loader from './components/Loader';
import StatistikData from './components/StatistikData';
import MiniSidebar from './components/MiniSidebar';
import EditVisitor from './components/EditVisitor';
import Admin from './components/Admin';
import AddUser from './components/AddUser';
import Profile from './components/Profile';
import AddDepartment from './components/AddDepartment';
import EditDepartment from './components/EditDepartment';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const AdminRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('role') === 'admin';
    return isAdmin ? children : <Navigate to="/login" />;
  };

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    if (status) {
      setLoading(true);
      navigate('/');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setLoading(true);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/login');
    setLoading(false);
  };

  return (
    <div className="d-flex">
      {isLoggedIn && <MiniSidebar onLogout={handleLogout} userRole={userRole} />}
      <div className="d-flex flex-column min-vh-100 flex-grow-1">
        {isLoggedIn && <Header onLogout={handleLogout} />}

        {/* Teks berjalan di bawah header */}
        {isLoggedIn && (
          <marquee behavior="scroll" direction="left">
            Selamat Datang di Buku Tamu Dinas Komunikasi dan Informatika Daerah Istimewa Yogyakarta
          </marquee>
        )}

        <div className="container-fluid flex-grow-1 p-0">
          {!isLoggedIn ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Routes>
              <Route path="/" element={<StatistikData />} />
              <Route path="/guest" element={<VisitorData />} />
              <Route path="/add" element={<VisitorForm />} />
              <Route path="/profile" element={<Profile onNavigate={handleNavigation}/>} />
              <Route path="/edit/:index" element={isLoggedIn ? <EditVisitor /> : <Navigate to="/login" />} />
              <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
              <Route path="/add-user" element={<AdminRoute><AddUser /></AdminRoute>} />
              <Route path="/add-department" element={<AdminRoute><AddDepartment /></AdminRoute>} />
              <Route path="/edit-department/:id" element={<EditDepartment />} />
            </Routes>
          )}
        </div>
        {isLoggedIn && <Footer />}
        {loading && <Loader />}
      </div>
    </div>
  );
}

export default App;
