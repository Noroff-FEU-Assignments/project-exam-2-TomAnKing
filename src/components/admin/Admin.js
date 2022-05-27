import { Link } from "react-router-dom";
import Head from "../layout/Head";

function Admin() {
  return (
    <>
      <Head title={"Admin"} />
      <div className="container">
        <h1>Admin</h1>
        <div className="adminLinks">
          <div className="adminLink">
            <Link to={`/admin/add-hotel`}>
              <h2>Add Hotel</h2>
            </Link>
          </div>
          <div className="adminLink">
            <Link to={`/admin/messages`}>
              <h2>Messages</h2>
            </Link>
          </div>
          <div className="adminLink">
            <Link to={`/admin/enquiries`}>
              <h2>Enquiries</h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
