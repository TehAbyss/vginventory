import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";

export const NavBar = () => {
    return (
     <div className='App tc f3'>
        <Navbar bg='light' expand='lg'>
            <Navbar.Brand>
                <Link to="/">VGinventory</Link>
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='mr-auto'>
              <LinkContainer to="/users/:id">
                <NavItem>Profile</NavItem>
              </LinkContainer>
            </Nav>
            <Nav className='mr-auto'>
              <LinkContainer to="/videogames">
                <NavItem>Video Games</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
}