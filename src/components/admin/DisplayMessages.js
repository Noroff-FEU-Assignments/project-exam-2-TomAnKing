function DisplayMessages({ messages }) {
  return (
    <div className="container">
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
