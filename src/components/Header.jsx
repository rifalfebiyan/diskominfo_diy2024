import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Dropdown } from 'react-bootstrap';

function Header({ onLogout }) {
  const [show, setShow] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    setShow(false);
    onLogout();
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarVisible && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarVisible]);

  return (
    <header style={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#A83427', width: '100%' }}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img 
              src="/logo_diskominfo.png"
              alt="Logo" 
              style={{ width: '200px', height: '40px' }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleSidebar}
            aria-controls="navbarNav"
            aria-expanded={sidebarVisible}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-basic" className="nav-link d-flex align-items-center" style={{ color: 'white' }}>
                    <i className="bi bi-person-circle" style={{ fontSize: '20px', color: 'white' }}></i>
                    <span className="ms-2">Admin</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleShow}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar2 ${sidebarVisible ? 'visible' : ''}`} ref={sidebarRef}>
        <button className="close-btn" onClick={() => setSidebarVisible(false)}>&times;</button>
        <ul className="list-unstyled p-3">
          <li><a href="/dashboard" className="sidebar-link">Home</a></li>
          <li><a href="/admin" className="sidebar-link">Admin Dashboard</a></li>
          <li><a href="/guest" className="sidebar-link">Data Tamu</a></li>
          <li><a href="/add" className="sidebar-link">Formulir Tamu</a></li>
          <li><a href="/profile" className="sidebar-link">Profile</a></li>
          <li onClick={handleShow}><a className="sidebar-link">Logout</a></li>
        </ul>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda yakin ingin keluar?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batalkan
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}

export default Header;
