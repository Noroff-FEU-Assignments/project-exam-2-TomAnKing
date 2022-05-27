import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

function NavBar({ auth, signOut }) {
  return (
    <Navbar sticky="top" bg="light" expand="lg" className="navBar">
      <Navbar.Brand className="navBrand">
        <NavLink to="/" className="nav-brand">
          Holidaze
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/accommodations" className="nav-link">
            Accommodations
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
          {auth ? (
            <>
              <NavLink className="nav-link" to="/admin">
                Admin
              </NavLink>
              <NavLink className="nav-link signOut" to="/" onClick={signOut}>
                Sign Out
              </NavLink>
            </>
          ) : (
            <NavLink to="/signin" className="nav-link">
              Sign In
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
