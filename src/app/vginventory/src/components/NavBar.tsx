import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { useAuth0 } from "../react-auth0-spa";

export const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className='App tc f3'>
      <Navbar bg='dark' variant='dark' expand='lg'>
          <LinkContainer to="/">
            <Navbar.Brand>VGinventory</Navbar.Brand>
          </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div>
            {isAuthenticated && (
                <Nav className='mr-auto'>
                  <LinkContainer to="/members">
                    <Nav.Link>Members</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/users">
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/videogames">
                    <Nav.Link>Video Games</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={() => logout()}>Log out</Nav.Link>
                </Nav>
            )}

            {!isAuthenticated && (
              <Nav className='mr-auto'>
                <Nav.Link onClick={() => loginWithRedirect({})}>Log in</Nav.Link>
              </Nav>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}