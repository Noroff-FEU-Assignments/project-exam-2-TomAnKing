import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="container">
      <h1>Admin</h1>
      <Link to={`/admin/add-hotel`}>
        <h2>Add Hotel</h2>
      </Link>
      <Link to={`/admin/messages`}>
        <h2>Messages</h2>
      </Link>
      <Link to={`/admin/enquiries`}>
        <h2>Enquiries</h2>
      </Link>
    </div>
  );
}

export default Admin;
