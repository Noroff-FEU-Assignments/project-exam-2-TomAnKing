import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DisplayMessages() {
  const [messages, setMessage] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    getMessages();

    async function getMessages() {
      try {
        const response = await axios.get(
          "https://holidaze.tomanking.one/wp-json/wp/v2/messages"
        );
        setMessage(response.data);
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
    return <div className="container">Failed to load accommodations</div>;
  }

  return (
    <div className="container">
      <div className="backBtn">
        <Link to="/admin">
          <p>Admin &gt;</p>
        </Link>
        <p className="backBtnTitle">Messages</p>
      </div>
      <h1>Messages</h1>
      <div className="messages">
        {messages.map((message) => {
          return (
            <div className="messageBox" key={message.id}>
              <h3 className="messageLabel">First Name:</h3>
              <p>{message.acf.first_name}</p>
              <h3 className="messageLabel">Last Name:</h3>
              <p>{message.acf.last_name}</p>
              <h3 className="messageLabel">Email:</h3>
              <p>{message.acf.email}</p>
              <h3 className="messageLabel">Message:</h3>
              <p>{message.acf.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DisplayMessages;
