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
import Admin from "../admin/Admin";
import FetchHotels, { FetchMessages } from "../../config/FetchHotels";
import Accommodation from "../accommodations/Accommodation";
import Footer from "./Footer";
import AddHotel from "../admin/AddHotel";
import DisplayMessages from "../admin/DisplayMessages";
import DisplayEnquiries from "../admin/DisplayEnquiries";
import { useState } from "react";
import SigninForm from "../forms/SigninForm";

function Layout() {
  let [auth, setAuth] = useState(null);

  const hotel = FetchHotels().hotel;
  const hotelError = FetchHotels().error;

  if (localStorage.getItem("auth")) {
    auth = localStorage.getItem("auth");
  }

  const handleClick = () => {
    auth = localStorage.getItem("auth");
    setAuth(auth);
  };

  function logOut() {
    localStorage.removeItem("auth");
    setAuth("");
  }

  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg" className="navBar">
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
                  <NavLink className="nav-link signOut" to="/" onClick={logOut}>
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
        <Routes>
          <Route path="/" element={<Home hotels={hotel} />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/accommodations"
            element={<Accommodations hotels={hotel} error={hotelError} />}
          />
          <Route
            path="/signin"
            element={<SigninForm handleClick={handleClick} />}
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/accommodations/:id" element={<Accommodation />} />
          <Route path="/admin/add-hotel" element={<AddHotel />} />
          <Route path="/admin/messages" element={<DisplayMessages />} />
          <Route path="/admin/enquiries" element={<DisplayEnquiries />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default Layout;
