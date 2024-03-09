import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Automatically scroll to the bottom when new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    // Add logic to send user input to the API
    try {
      // Show user message immediately
      const newMessage = { id: messages.length + 1, text: input };
      setMessages([...messages, newMessage]);
      setInput('');

      const response = await fetch('http://localhost:5000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });

     if(response){
        console.log(response)
     }

      const responseData = await response.json();

      // Check if the response data contains the expected 'data' field
      console.log(responseData)
      if (responseData && responseData.data) {
        const botMessage = { id: messages.length + 2, text: responseData.data };
        setMessages([...messages, botMessage]);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">ChatBot</h1>
      <div className="chat-container" ref={chatContainerRef}>
        {messages.map(message => (
          <div key={message.id} className="message">{message.text}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={input}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">Send</button>
        </div>
      </form>
    </div>
  );
}

export default ChatBot;
