import { useState } from "react";
import Head from "../layout/Head";
import AddHotel from "./AddHotel";
import DisplayEnquiries from "./DisplayEnquiries";
import DisplayMessages from "./DisplayMessages";

function Admin() {
  const [content, setContent] = useState("hotel");

  function handleClick(val) {
    switch (val) {
      case "hotel":
        setContent("hotel");
        break;
      case "message":
        setContent("message");
        break;
      case "enquiries":
        setContent("enquiries");
        break;
      default:
        setContent("hotel");
    }
  }

  function GetContent() {
    switch (content) {
      case "hotel":
        return <AddHotel />;
      case "message":
        return <DisplayMessages />;
      case "enquiries":
        return <DisplayEnquiries />;
    }
    return <AddHotel />;
  }

  return (
    <>
      <Head title={"Admin"} />
      <div className="container">
        <h1>Admin</h1>
        <select
          className="adminDropdown"
          onChange={(e) => handleClick(e.target.value)}
        >
          <option value="hotel">Add Hotel</option>
          <option value="message">Messages</option>
          <option value="enquiries">Enquiries</option>
        </select>
        <GetContent />
      </div>
    </>
  );
}

export default Admin;
