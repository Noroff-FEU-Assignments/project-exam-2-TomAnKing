import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import ContactForm from "../forms/ContactForm";
import Accommodations from "../accommodations/Accommodations";
import Admin from "../admin/Admin";
import FetchHotels, { FetchMessages } from "../../config/FetchHotels";
import AccommodationDetails from "../accommodations/AccommodationDetails";
import Footer from "./Footer";
import AddHotel from "../admin/AddHotel";
import DisplayMessages from "../admin/DisplayMessages";
import DisplayEnquiries from "../admin/DisplayEnquiries";
import { useState } from "react";
import SigninForm from "../forms/SigninForm";
import NavBar from "./NavBar";

function Layout() {
  let [auth, setAuth] = useState(null);

  const hotel = FetchHotels().hotel;
  const hotelError = FetchHotels().error;

  if (localStorage.getItem("auth")) {
    auth = localStorage.getItem("auth");
  }

  const signIn = () => {
    auth = localStorage.getItem("auth");
    setAuth(auth);
  };

  function signOut() {
    localStorage.removeItem("auth");
    setAuth("");
  }

  return (
    <Router>
      <div>
        <NavBar auth={auth} signOut={signOut} />
        <Routes>
          <Route path="/" element={<Home hotels={hotel} />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route
            path="/accommodations"
            element={<Accommodations hotels={hotel} error={hotelError} />}
          />
          <Route path="/signin" element={<SigninForm signIn={signIn} />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/accommodations/:id"
            element={<AccommodationDetails />}
          />
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
