import { FetchEnquiries } from "../../config/FetchHotels";

function DisplayEnquiries() {
  const enquiries = FetchEnquiries();
  return (
    <div className="container">
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
              <h3 className="messageLabel">expiration date:</h3>
              <p>{enquiry.acf.expiration_date}</p>
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
