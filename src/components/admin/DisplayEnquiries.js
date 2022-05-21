function DisplayEnquiries({ enquiries }) {
  return (
    <div className="container">
      <h1>Enquiries</h1>
      {enquiries.map((enquiry) => {
        return (
          <div key={enquiry.id}>
            <h2>{enquiry.title.rendered}</h2>
            <p>{enquiry.acf.card_name}</p>
            <p>{enquiry.acf.card_number}</p>
            <p>{enquiry.acf.expiration_date}</p>
            <p>
              Fra dato: {new Date(enquiry.acf.from_date).toLocaleDateString()}
            </p>
            <p>
              Til dato: {new Date(enquiry.acf.to_date).toLocaleDateString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DisplayEnquiries;
