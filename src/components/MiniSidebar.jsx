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
    width: isHovered ? '120px' : '40px',
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

  const linkStyle = (isHovered) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isHovered ? 'flex-start' : 'center',
    color: 'white',
    textDecoration: 'none',
    fontSize: '15px',
    padding: '12px 20px',
    transition: 'all 0.3s ease',
  });

  const iconStyle = (isHovered, isActive) => ({
    fontFamily: 'FontAwesome',
    fontSize: '22px',
    marginRight: isHovered ? '10px' : '0',
    transition: 'color 0.3s ease',
    color: isActive || isHovered ? 'yellow' : 'white',
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
          <li
            onMouseEnter={() => handleMouseEnter('home')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/" style={linkStyle(hoveredItem === 'home')}>
              <span style={iconStyle(hoveredItem === 'home', location.pathname === '/')}>
                &#xf015;
              </span>
              {hoveredItem === 'home' && <span>Home</span>}
            </Link>
          </li>

          {/* Admin Dashboard - Only visible to admin */}
          {role === 'admin' && (
            <li
              onMouseEnter={() => handleMouseEnter('admin')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/admin" style={linkStyle(hoveredItem === 'admin')}>
                <span style={iconStyle(hoveredItem === 'admin', location.pathname === '/admin')}>
                  &#xf013;
                </span>
                {hoveredItem === 'admin' && <span>Dashboard Admin</span>}
              </Link>
            </li>
          )}

          {/* User Dashboard - Only visible to user */}
          {role === 'user' && (
            <li
              onMouseEnter={() => handleMouseEnter('user')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/user" style={linkStyle(hoveredItem === 'user')}>
                <span style={iconStyle(hoveredItem === 'user', location.pathname === '/user')}>
                  &#xf007;
                </span>
                {hoveredItem === 'user' && <span>Dashboard User</span>}
              </Link>
            </li>
          )}

          {/* Spectator Dashboard - Only visible to spectator */}
          {role === 'spectator' && (
            <>
                <li
                onMouseEnter={() => handleMouseEnter('guest')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/visitor-data-spectator" style={linkStyle(hoveredItem === 'guest')}>
                <span
                  style={iconStyle(
                    hoveredItem === 'guest',
                    location.pathname === '/visitor-data-spectator'
                  )}
                >
                  &#xf02d;
                </span>
                  {hoveredItem === 'guest' && <span>Tamu</span>}
                </Link>
              </li>
              
              <li
                onMouseEnter={() => handleMouseEnter('add')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/add" style={linkStyle(hoveredItem === 'add')}>
                  <span style={iconStyle(hoveredItem === 'add', location.pathname === '/add')}>
                    &#xf044;
                  </span>
                  {hoveredItem === 'add' && <span>Form Tamu</span>}
                </Link>
              </li>
            </>
          )}
          
          {/* Guest and Add Form Links - Not visible to spectator */}
          {role !== 'spectator' && (
            <>
              <li
                onMouseEnter={() => handleMouseEnter('guest')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/guest" style={linkStyle(hoveredItem === 'guest')}>
                  <span style={iconStyle(hoveredItem === 'guest', location.pathname === '/guest')}>
                    &#xf02d;
                  </span>
                  {hoveredItem === 'guest' && <span>Tamu</span>}
                </Link>
              </li>

              <li
                onMouseEnter={() => handleMouseEnter('add')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/add" style={linkStyle(hoveredItem === 'add')}>
                  <span style={iconStyle(hoveredItem === 'add', location.pathname === '/add')}>
                    &#xf044;
                  </span>
                  {hoveredItem === 'add' && <span>Form Tamu</span>}
                </Link>
              </li>
            </>
          )}

          {/* Profile Link - Visible to all */}
          <li
            onMouseEnter={() => handleMouseEnter('profile')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/profile" style={linkStyle(hoveredItem === 'profile')}>
              <span style={iconStyle(hoveredItem === 'profile', location.pathname === '/profile')}>
                &#xf2bd;
              </span>
              {hoveredItem === 'profile' && <span>Profile</span>}
            </Link>
          </li>

          {/* Logout Link - Visible to all */}
          <li
            onMouseEnter={() => handleMouseEnter('logout')}
            onMouseLeave={handleMouseLeave}
          >
            <div
              onClick={handleShow}
              style={{ ...linkStyle(hoveredItem === 'logout'), cursor: 'pointer' }}
            >
              <span style={iconStyle(hoveredItem === 'logout')}>
                &#xf08b;
              </span>
              {hoveredItem === 'logout' && <span>Logout</span>}
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
