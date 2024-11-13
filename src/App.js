import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import DepartmentData from './components/DepartmentData';
import UserAddDepartment from './components/UserAddDepartment';
import EditDepartment from './components/EditDepartment';
import EditUser from './components/EditUser';
import UserData from './components/UserData'; 
import User from './components/User';
import AddAgency from './components/AddAgency';
import AgencyData from './components/AgencyData';
import EditAgency from './components/EditAgency';
import SpectatorDashboard from './components/SpectatorDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('userRole');
      if (token) {
        setIsLoggedIn(true);
        setUserRole(role);
        if (window.location.pathname === '/login') {
          navigate(role === 'admin' ? '/admin' : '/', { replace: true });
        }
      } else {
        if (window.location.pathname !== '/login') {
          navigate('/login', { replace: true });
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const AdminRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('userRole') === 'admin';
    return isAdmin ? children : <Navigate to="/login" replace />;
  };

  const UserRoute = ({ children }) => {
    const isUser = localStorage.getItem('userRole') === 'user';
    return isUser ? children : <Navigate to="/login" replace />;
};

  const SpectatorRoute = ({ children }) => {
    const isSpectator = localStorage.getItem('userRole') === 'spectator';
    return isSpectator ? children : <Navigate to="/login" replace />;
  };

  const handleLogin = (status, role) => {
    setIsLoggedIn(status);
    setUserRole(role);
    if (status && role === 'admin') {
      navigate('/admin', { replace: true });
    } else if (status) {
      navigate('/', { replace: true });
    }
  };

  const handleLogout = () => {
    setLoading(true);
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.clear();
    navigate('/login', { replace: true });
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="d-flex flex-column flex-lg-row">
      {isLoggedIn && <MiniSidebar onLogout={handleLogout} />} {/* Pass onLogout correctly */}
      <div className="d-flex flex-column flex-grow-1 min-vh-100">
        {isLoggedIn && <Header onLogout={handleLogout} />}
        {isLoggedIn && (
          <marquee behavior="scroll" direction="left">
            Selamat Datang di Buku Tamu Dinas Komunikasi dan Informatika Daerah Istimewa Yogyakarta
          </marquee>
        )}
        <div className="container-fluid flex-grow-1 p-0">
          <Routes>
            <Route
              path="/login"
              element={
                !isLoggedIn ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to={userRole === 'admin' ? '/admin' : '/'} replace />
                )
              }
            />

            <Route 
              path="/user" 
              element={
                isLoggedIn && userRole === 'user' ? (
                  <User />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            <Route 
              path="/spectator" 
              element={
                (() => {
                  console.log('isLoggedIn:', isLoggedIn);
                  console.log('userRole:', userRole);
                  return isLoggedIn && userRole === 'spectator' ? 
                    <SpectatorDashboard /> : 
                    <Navigate to="/login" replace />;
                })()
              } 
            />
            
            {/* Protected Routes */}
            <Route path="/" element={isLoggedIn ? <StatistikData /> : <Navigate to="/login" replace />} />
            <Route path="/guest" element={isLoggedIn ? <VisitorData /> : <Navigate to="/login" replace />} />
            <Route path="/add" element={isLoggedIn ? <VisitorForm /> : <Navigate to="/login" replace />} />
            <Route path="/profile" element={isLoggedIn ? <Profile onNavigate={handleNavigation} /> : <Navigate to="/login" replace />} />
            <Route path="/edit/:index" element={isLoggedIn ? <EditVisitor /> : <Navigate to="/login" replace />} />
            <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
            <Route path="/add-user" element={<AdminRoute><AddUser /></AdminRoute>} />
            <Route path="/user-detail/:id" element={<AdminRoute><UserData /></AdminRoute>} />            <Route path="/add-department" element={<AddDepartment />} />
            <Route 
              path="/user/add-department" 
              element={
                isLoggedIn && userRole === 'user' ? (
                  <UserAddDepartment />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route path="/department-data/:id" element={<AdminRoute><DepartmentData /></AdminRoute>} />
            <Route path="/edit-department/:id" element={<EditDepartment />} />
            <Route path="/add-department" element={<AddDepartment />} />
            <Route path="/edit-user/:id" element={<AdminRoute><EditUser /></AdminRoute>} />
            <Route path="/add-agency" element={<AdminRoute><AddAgency/></AdminRoute>} />
            <Route path="/agency-data" element={<AdminRoute><AgencyData/></AdminRoute>} />
            <Route path="/add-agency" element={<AdminRoute><AddAgency /></AdminRoute>} />
            <Route path="/agency-data/:id" element={<AdminRoute><AgencyData /></AdminRoute>} />
            <Route path="/edit-agency/:id" element={<AdminRoute><EditAgency /></AdminRoute>} />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to={isLoggedIn ? '/' : '/login'} replace />} />
          </Routes>
        </div>
        {isLoggedIn && <Footer />}
        {loading && <Loader />}
      </div>
    </div>
  );
}

export default App;
