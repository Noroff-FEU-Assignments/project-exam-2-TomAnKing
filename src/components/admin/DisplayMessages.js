function DisplayMessages({ messages }) {
  return (
    <div className="container">
      <h1>Messages</h1>
      {messages.map((message) => {
        return (
          <div key={message.id}>
            <h2>{message.acf.first_name}</h2>
            <p>{message.acf.last_name}</p>
            <p>{message.acf.email}</p>
            <p>{message.acf.message}</p>
          </div>
        );
      })}
    </div>
  );
}

export default DisplayMessages;
