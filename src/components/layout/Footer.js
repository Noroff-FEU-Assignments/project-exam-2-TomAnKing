import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footerLinks">
        <Link to={`/`}>
          <p className="footerLink">Home</p>
        </Link>
        <Link to={`/accommodations`}>
          <p className="footerLink">Accommodations</p>
        </Link>
        <Link to={`/contact`}>
          <p className="footerLink">Contact</p>
        </Link>
      </div>
      <div className="footerBottom">
        <div className="footerIcons">
          <i className="fab fa-instagram" id="instagram"></i>
          <i className="fab fa-twitter" id="twitter"></i>
        </div>
        <div id="footerEmail">holidaze@gmail.com</div>
        <div id="footerCopyright">Copyright 2021</div>
      </div>
    </div>
  );
}

export default Footer;
