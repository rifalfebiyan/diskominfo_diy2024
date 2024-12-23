import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { 
  FaHome, 
  FaTachometerAlt, 
  FaUser, 
  FaClipboardList, 
  FaEdit, 
  FaUserCircle, 
  FaSignOutAlt 
} from 'react-icons/fa';

function MiniSidebar({ onLogout }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [role, setRole] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    setRole(storedRole);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClose = () => setShowLogoutModal(false);
  const handleShow = () => setShowLogoutModal(true);

  const handleLogout = () => {
    setShowLogoutModal(false);
    onLogout();
    navigate('/login');
  };

  const sidebarStyle = {
    backgroundColor: '#A8332A',
    width: isHovered ? '180px' : '70px', // Lebar sidebar yang lebih lebar saat hover
    height: '60vh',
    position: 'fixed',
    left: 0,
    top: '20vh',
    bottom: '10vh',
    zIndex: 100,
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '20px',
    borderRadius: '0 20px 20px 0',
    transition: 'width 0.3s ease-in-out',
    overflow: 'hidden',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
  };

  const menuStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  };

  const linkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isHovered ? 'flex-start' : 'center',
    color: isActive ? '#FFD700' : 'white',
    textDecoration: 'none',
    fontSize: '14px',
    padding: '10px 15px',
    gap: '15px',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    width: '100%',
    opacity: isHovered ? 1 : 0.7,
  });

  const iconStyle = (isActive) => ({
    fontSize: '22px', // Ukuran ikon yang lebih besar
    color: isActive ? '#FFD700' : 'white',
    transition: 'color 0.3s ease',
    marginRight: '10px',
    minWidth: '25px',
    textAlign: 'center',
  });

  const labelStyle = {
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.3s ease',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      <div
        style={sidebarStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul style={menuStyle}>
          {/* Home Link - Visible to all */}
          <li onMouseEnter={() => handleMouseEnter('home')} onMouseLeave={handleMouseLeave}>
            <Link to="/" style={linkStyle(location.pathname === '/')}>
              <FaHome style={iconStyle(location.pathname === '/')} />
              {isHovered && <span>Beranda</span>}
            </Link>
          </li>

          {/* Admin Dashboard - Only visible to admin */}
          {role === 'admin' && (
            <li onMouseEnter={() => handleMouseEnter('admin')} onMouseLeave={handleMouseLeave}>
              <Link to="/admin" style={linkStyle(location.pathname === '/admin')}>
                <FaTachometerAlt style={iconStyle(location.pathname === '/admin')} />
                {isHovered && <span>Dashboard</span>}
              </Link>
            </li>
          )}

          {/* User Dashboard - Only visible to user */}
          {role === 'user' && (
            <li onMouseEnter={() => handleMouseEnter('user')} onMouseLeave={handleMouseLeave}>
              <Link to="/user" style={linkStyle(location.pathname === '/user')}>
                <FaUser style={iconStyle(location.pathname === '/user')} />
                {isHovered && <span>Dashboard</span>}
              </Link>
            </li>
          )}

          {/* Spectator Dashboard - Only visible to spectator */}
          {role === 'spectator' && (
            <>
              <li onMouseEnter={() => handleMouseEnter('guest')} onMouseLeave={handleMouseLeave}>
                <Link to="/visitor-data-spectator" style={linkStyle(location.pathname === '/visitor-data-spectator')}>
                  <FaClipboardList style={iconStyle(location.pathname === '/visitor-data-spectator')} />
                  {isHovered && <span>Daftar Tamu</span>}
                </Link>
              </li>
              <li onMouseEnter={() => handleMouseEnter('add')} onMouseLeave={handleMouseLeave}>
                <Link to="/add" style={linkStyle(location.pathname === '/add')}>
                  <FaEdit style={iconStyle(location.pathname === '/add')} />
                  {isHovered && <span>Form Tamu</span>}
                </Link>
              </li>
            </>
          )}

          {/* Guest and Add Form Links - Not visible to spectator */}
          {role !== 'spectator' && (
            <>
              <li onMouseEnter={() => handleMouseEnter('guest')} onMouseLeave={handleMouseLeave}>
                <Link to="/guest" style={linkStyle(location.pathname === '/guest')}>
                  <FaClipboardList style={iconStyle(location.pathname === '/guest')} />
                  {isHovered && <span>Daftar Tamu</span>}
                </Link>
              </li>
              <li onMouseEnter={() => handleMouseEnter('add')} onMouseLeave={handleMouseLeave}>
                <Link to="/add" style={linkStyle(location.pathname === '/add')}>
                  <FaEdit style={iconStyle(location.pathname === '/add')} />
                  {isHovered && <span>Form Tamu</span>}
                </Link>
              </li>
            </>
          )}

          {/* Profile Link - Visible to all */}
          <li onMouseEnter={() => handleMouseEnter('profile')} onMouseLeave={handleMouseLeave}> <Link to="/profile" style={linkStyle(location.pathname === '/profile')}>
                <FaUser Circle style={iconStyle(location.pathname === '/profile')} />
                {isHovered && <span>Profil</span>}
              </Link>
            </li>

          {/* Logout Link - Visible to all */}
          <li onMouseEnter={() => handleMouseEnter('logout')} onMouseLeave={handleMouseLeave}>
            <div 
              onClick={handleShow} 
              style={{ 
                ...linkStyle(false), 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FaSignOutAlt style={iconStyle(false)} />
              {isHovered && <span>Keluar</span>}
            </div>
          </li>
        </ul>
      </div>

      {/* Modal logout tetap sama */}
      <Modal show={showLogoutModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin keluar?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Keluar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MiniSidebar;