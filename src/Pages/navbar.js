import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/navbar.css';

const NavbarComponent = () => {
 return (
  <Navbar bg="secondary" expand="lg" class="p-3 mb-2 bg-gradient bg-secondary text-white" >
    <Container >
      <Navbar.Brand style={{color: 'white'}} >Group 9</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link className="nav-link" to="/" style={{color: 'white'}}>Home</Link>
          <Link className="nav-link" to="/product" style={{color: 'white'}}>Products</Link>
          <Link className="nav-link" to="/stock" style={{color: 'white'}}>Stocks</Link>
          <Link className="nav-link" to="/transactions" style={{color: 'white'}}>Transactions</Link>
          <Link className="nav-link" to="/reports" style={{color: 'white'}}>Reports</Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
 );
};

export default NavbarComponent;
