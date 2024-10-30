import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="d-flex justify-content-between px-4">
      <Form inline>
        <Button variant="outline-secondary" className="mr-2">☰</Button>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
      <div className="d-flex align-items-center">
        <Button variant="primary" className="mr-3">+ New Task</Button>
        <span className="mr-2">🔔</span>
        <span>Bonnie Green</span>
      </div>
    </Navbar>
  );
}

export default Header;
