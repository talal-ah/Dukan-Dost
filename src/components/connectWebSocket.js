// const connectWebSocket = () => {
//     const socket = new WebSocket("ws://127.0.0.1:8000/ws/notification/");
  
//     // When WebSocket is open
//     socket.onopen = () => {
//       console.log("Connected to WebSocket server");
  
//       // Send a message to the server
//       const messageToSend = { message: "Hello from client!" };
//       socket.send(JSON.stringify(messageToSend));
//     };
  
//     // When a message is received from WebSocket
//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Received message:", data.message);
//     };
  
//     // When WebSocket is closed
//     socket.onclose = () => {
//       console.log("Disconnected from WebSocket server");
//     };
  
//     // Handle WebSocket errors
//     socket.onerror = (error) => {
//       console.log("WebSocket Error: ", error);
//     };
  
//     return socket;  // Return the WebSocket connection in case you need to use it later
//   };
  
//   // Call this function to initiate the WebSocket connection
//   const socket = connectWebSocket();
  
//   // Send a message after a delay (for example, 5 seconds after connection)
// //   setTimeout(() => {
// //     if (socket && socket.readyState === WebSocket.OPEN) {
// //       socket.send(JSON.stringify({ message: "Sending after delay!" }));
// //     }
// //   }, 5000);
//   export default  connectWebSocket
  