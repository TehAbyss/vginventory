import React from 'react';
import { useAuth0 } from "../react-auth0-spa";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

export const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              href="/"
              title="Coded by Noobies"
            >
              VGinventory
            </NavbarBrand>
            <button
              aria-expanded={navbarCollapse}
              className={classnames("navbar-toggler navbar-toggler", {
                toggled: navbarCollapse
              })}
              onClick={toggleNavbarCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
        </div>
        <Collapse
        className="justify-content-end"
        navbar
        isOpen={navbarCollapse}
        >
          {isAuthenticated && (
            <Nav navbar>
              <NavItem>
                <NavLink
                href="/users"
                title="Profile"
                >
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                href="/videogames"
                title="Video Game List"
                >
                  Video Games
                </NavLink>
              </NavItem>
              <NavItem>
                <Button
                className="btn-round"
                color="default"
                onClick={() => logout()}
                >
                  Log out
                </Button>
              </NavItem>
            </Nav>
          )}

          {!isAuthenticated && (
            <Nav navbar>
              <NavItem>
                <Button
                className="btn-round"
                color="default"
                onClick={() => loginWithRedirect({})}
                >
                  Log in
                </Button>
              </NavItem>
            </Nav>
          )}
        </Collapse>
      </Container>
    </Navbar>
  );
}