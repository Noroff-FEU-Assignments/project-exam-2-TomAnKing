import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DisplayEnquiries() {
  const [enquiries, setEnquiry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(function () {
    getEnquiries();

    async function getEnquiries() {
      try {
        const response = await axios.get(
          "https://holidaze.tomanking.one/wp-json/wp/v2/enquiries"
        );
        setEnquiry(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div className="container">An error occured</div>;
  }

  return (
    <div className="container">
      <div className="backBtn">
        <Link to="/admin">
          <p>Admin &gt;</p>
        </Link>
        <p className="backBtnTitle">Enquiries</p>
      </div>
      <h1>Enquiries</h1>
      <div className="messages">
        {enquiries.map((enquiry) => {
          return (
            <div className="messageBox" key={enquiry.id}>
              <h3 className="messageLabel">Hotel:</h3>
              <p>{enquiry.title.rendered}</p>
              <h3 className="messageLabel">Name on Card:</h3>
              <p>{enquiry.acf.card_name}</p>
              <h3 className="messageLabel">Card Number:</h3>
              <p>{enquiry.acf.card_number}</p>
              <h3 className="messageLabel">Expiration date:</h3>
              <p>
                {enquiry.acf.expiration_month} / {enquiry.acf.expiration_year}
              </p>
              <h3 className="messageLabel">Booking Dates</h3>
              <p>
                From: {new Date(enquiry.acf.from_date).toLocaleDateString()}
              </p>
              <p>To: {new Date(enquiry.acf.to_date).toLocaleDateString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DisplayEnquiries;
