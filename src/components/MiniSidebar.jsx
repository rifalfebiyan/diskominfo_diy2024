// src/components/MiniSidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

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
    width: isHovered ? '110px' : '40px',
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
    borderRadius: '0 50px 50px 0',
    transition: 'width 0.3s ease-in-out',
    overflow: 'hidden',
  };

  const menuStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const linkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isHovered ? 'flex-start' : 'center',
    color: isActive ? 'yellow' : 'white',
    textDecoration: 'none',
    fontSize: '15px',
    padding: '12px 15px',
    gap: '12px', // Consistent spacing between icon and text
    transition: 'all 0.3s ease',
  });

  const iconStyle = (isActive) => ({
    fontFamily: 'FontAwesome',
    fontSize: '18px',
    transition: 'color 0.3s ease',
    color: isActive ? 'yellow' : 'white',
  });

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
              <span style={iconStyle(location.pathname === '/')}>
                &#xf015;
              </span>
              {isHovered && <span>Home</span>}
            </Link>
          </li>

          {/* Admin Dashboard - Only visible to admin */}
          {role === 'admin' && (
            <li onMouseEnter={() => handleMouseEnter('admin')} onMouseLeave={handleMouseLeave}>
              <Link to="/admin" style={linkStyle(location.pathname === '/admin')}>
                <span style={iconStyle(location.pathname === '/admin')}>
                  &#xf013;
                </span>
                {isHovered && <span>Dashboard Admin</span>}
              </Link>
            </li>
          )}

          {/* User Dashboard - Only visible to user */}
          {role === 'user' && (
            <li onMouseEnter={() => handleMouseEnter('user')} onMouseLeave={handleMouseLeave}>
              <Link to="/user" style={linkStyle(location.pathname === '/user')}>
                <span style={iconStyle(location.pathname === '/user')}>
                  &#xf007;
                </span>
                {isHovered && <span >Dashboard User</span>}
              </Link>
            </li>
          )}

          {/* Spectator Dashboard - Only visible to spectator */}
          {role === 'spectator' && (
            <>
              <li onMouseEnter={() => handleMouseEnter('guest')} onMouseLeave={handleMouseLeave}>
                <Link to="/visitor-data-spectator" style={linkStyle(location.pathname === '/visitor-data-spectator')}>
                  <span style={iconStyle(location.pathname === '/visitor-data-spectator')}>
                    &#xf02d;
                  </span>
                  {isHovered && <span>Tamu</span>}
                </Link>
              </li>
              <li onMouseEnter={() => handleMouseEnter('add')} onMouseLeave={handleMouseLeave}>
                <Link to="/add" style={linkStyle(location.pathname === '/add')}>
                  <span style={iconStyle(location.pathname === '/add')}>
                    &#xf044;
                  </span>
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
                  <span style={iconStyle(location.pathname === '/guest')}>
                    &#xf02d;
                  </span>
                  {isHovered && <span>Tamu</span>}
                </Link>
              </li>
              <li onMouseEnter={() => handleMouseEnter('add')} onMouseLeave={handleMouseLeave}>
                <Link to="/add" style={linkStyle(location.pathname === '/add')}>
                  <span style={iconStyle(location.pathname === '/add')}>
                    &#xf044;
                  </span>
                  {isHovered && <span>Form Tamu</span>}
                </Link>
              </li>
            </>
          )}

          {/* Profile Link - Visible to all */}
          <li onMouseEnter={() => handleMouseEnter('profile')} onMouseLeave={handleMouseLeave}>
            <Link to="/profile" style={linkStyle(location.pathname === '/profile')}>
              <span style={iconStyle(location.pathname === '/profile')}>
                &#xf2bd;
              </span>
              {isHovered && <span>Profile</span>}
            </Link>
          </li>

          {/* Logout Link - Visible to all */}
          <li onMouseEnter={() => handleMouseEnter('logout')} onMouseLeave={handleMouseLeave}>
            <div onClick={handleShow} style={{ ...linkStyle(false), cursor: 'pointer' }}>
              <span style={iconStyle(false)}>
                &#xf08b;
              </span>
              {isHovered && <span>Logout</span>}
            </div>
          </li>
        </ul>
      </div>

      <Modal show={showLogoutModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MiniSidebar;