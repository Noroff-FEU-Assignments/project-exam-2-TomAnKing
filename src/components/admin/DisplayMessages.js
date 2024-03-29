import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/api";

import Head from "../layout/Head";

function DisplayMessages() {
  const [messages, setMessage] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    getMessages();

    async function getMessages() {
      try {
        const response = await axios.get(BASE_URL + "wp/v2/messages");
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
    <>
      <Head title={"Admin - Messages"} />
      <div className="container">
        <h1 className="adminContentTitle">Messages</h1>
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
    </>
  );
}

export default DisplayMessages;
