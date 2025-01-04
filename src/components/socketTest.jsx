import React, { useEffect, useState } from 'react';

function SocketTest() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create a WebSocket connection
    const ws = new WebSocket('ws://127.0.0.1:8000/ws/chat/d49b93af-83fb-4876-815a-2c01acec7775/a9c49e85-4957-4d31-82ac-15cab4290117/');
    setSocket(ws);

    // Event listener for when the connection is opened
    ws.onopen = () => {
      console.log('WebSocket connection opened');
      // You can send an initial message here if needed
      ws.send('Hello from React, connection established!');
    };

    // Event listener for when a message is received
    ws.onmessage = (event) => {
      const newMessage = event.data;
      console.log(newMessage)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Event listener for when the connection is closed
    // ws.onclose = () => {
    //   console.log('WebSocket connection closed');
    // };

    // Clean up the WebSocket connection when the component is unmounted
   
  }, [ws]);
 

  return (
    <div>
      <h1>Socket Test</h1>
       
      </div>
    
  );
}

export default SocketTest;
