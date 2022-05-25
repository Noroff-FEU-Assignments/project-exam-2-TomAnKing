function InfoCard() {
  return (
    <div className="infoCard">
      <h2>Holidaze</h2>
      <p>
        Holidaze is a tourism agency based in the lovely city of Bergen Norway.
        We have a fantastic partnership with a number of different hotels and
        other accommodations to ensure everyone a magical experience in Bergen.
        Through us you can book an accommodation that fits your needs and budget
        perfectly. Feel free to contact us if you have any questions regarding
        accommodation, or activities to do while visiting Bergen.
      </p>
      <h3 className="standardsHeading">Standards for our accommodations</h3>
      <div className="accommodationStandards">
        <div className="standardsItem">
          <i className="fas fa-hand-sparkles standardsIcon"></i>
          <h4>Hygiene</h4>
          <p>Our accommodations are thoroughly washed between each stay.</p>
        </div>
        <div className="standardsItem">
          <i className="fas fa-pump-soap standardsIcon"></i>
          <h4>Hand sanitiser</h4>
          <p>Free hand sanitizer can be found at all accommodations.</p>
        </div>
        <div className="standardsItem">
          <i className="fas fa-certificate standardsIcon"></i>
          <h4>Travel Safe</h4>
          <p>All our partners are certified.</p>
        </div>
        <div className="standardsItem">
          <i className="fas fa-wifi standardsIcon"></i>
          <h4>Wifi</h4>
          <p>All our accommodations have wifi available.</p>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
