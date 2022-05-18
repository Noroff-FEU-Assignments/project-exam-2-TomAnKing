import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "../home/Home";
import Contact from "../contact/Contact";
import Accommodations from "../accommodations/Accommodations";
import Signin from "../signin/Signin";
import Admin from "../admin/Admin";
import FetchHotels from "../../config/FetchHotels";
import Accommodation from "../accommodations/Accommodation";

function Layout() {
  const hotel = FetchHotels();
  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg" className="navBar">
          <Navbar.Brand className="navBrand">
            <NavLink to="/" className="nav-link">
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
              <NavLink to="/signin" className="nav-link">
                Sign In
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home hotels={hotel} />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/accommodations"
            element={<Accommodations hotels={hotel} />}
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/accommodations/:id" element={<Accommodation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Layout;
