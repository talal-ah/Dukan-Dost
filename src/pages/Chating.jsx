import React, { useEffect, useState } from 'react';
import { useGroupListQuery } from '../reduxServices/Apis/ChatApi';
import { useSelector   } from 'react-redux';
 

function Chatting({notifications}) {
  const obj =  useSelector(state => state.componentName);
  const dukandata =  useSelector(state => state.dukandata);

  const componentName=obj.componentName
  const [notifiedCustomers, setNotifiedCustomers] = useState([]);

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [ws, setWs] = useState(null);
  const [groupedMessages, setGroupedMessages] = useState({}); 
  // Store grouped messages
const [groupid,setGroupid]=useState([])
  // Fetch the list of customer groups and messages
  const { data: groupData, isSuccess: isGroupSuccess,refetch } = useGroupListQuery(dukandata.dukaanId);

  // Set customers and their messages after data is successfully fetched
  useEffect(() => {
    if (isGroupSuccess && groupData.length > 0) {
      // console.log('Group Data:', groupData[0]); // Debugging: Check structure of group data
      setGroupid(groupData.group_id)
      console.log("this iskls qio",groupData.group_id)
      // Assuming all messages and customer details are inside groupData[0]
      const data = groupData[0];
  
      // Group messages by customer_id
      const grouped = data.messages.reduce((acc, message) => {
        const customerId = message.customer_id;
        // console.log('messagees:=>',message.customer_details.user_name )
  
        if (!acc[customerId]) {
          acc[customerId] = {
            id: customerId,
            name: message.customer_details.user_name,
            messages: [],
          };
        }
        acc[customerId].messages.push(message); // Add each message to the correct customer
       

        return acc;
      }, {});
  
      setGroupedMessages(grouped);
  
      // Extract unique customer list from the grouped messages
      const customerList = Object.values(grouped).map(customer => ({
        id: customer.id,
        name: customer.name,
      }));
  
      setCustomers(customerList);
    }
    console.log(customers)
  }, [groupData, isGroupSuccess]);

  function ismesaage(customerId) {
  
  const isnotify=customers.some(customer => customer.id === customerId);
  console.log('isnotify',isnotify)
  console.log(customers)
  if (isnotify && !notifiedCustomers.includes(customerId)) {
    setNotifiedCustomers([customerId]); // Add to notification list
  }

  

  
}
  
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);
  // Handle WebSocket connection for real-time messaging
  const chatWith = (shop_id) => {
    // Check if a WebSocket connection is already open
    if (ws && ws.readyState === WebSocket.OPEN) {
        console.log('WebSocket connection is already open');
        return;
    }

    if (ws) {
        ws.close(); // Close any existing WebSocket connections
    }

    // Open a new WebSocket connection
 
      const newWs = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${dukandata.dukaanId}/`);
 
    setWs(newWs);

    newWs.onopen = () => {
        console.log('WebSocket connection opened');
    };

    newWs.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        console.log('New message received from WebSocket:', newMessage);

        // Append the new message to the current list of messages
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        if (Notification.permission === 'granted' && newMessage.sender !='owner' ) {
          ismesaage(newMessage.customer_id)
          new Notification('New Message', {
            body: newMessage.message, // Show the message in the notification
          });
        } else {
          console.log('Notification permission not granted');
        }
    };

    newWs.onclose = () => {
        console.log('WebSocket connection closed');
        setWs(null); // Reset ws state
    };
};

useEffect(() => {
  console.log('orignal',notifications)
  if (ws) {
    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log('New message received from WebSocket 3:', newMessage);
      refetch()

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      if (Notification.permission === 'granted' && newMessage.sender !='owner' ) {

        ismesaage(newMessage.customer_id)
        new Notification('New Message', {
          body: newMessage.message, // Show the message in the notification
        });
      } else {
        console.log('Notification permission not granted');
      }
      // Call isMessage when a new message is received
    };
  }
}, [ws, customers]); 

// Trigger chatWith only when groupid changes
useEffect(() => {
   chatWith(groupid)
}, []); // Add groupid to the dependency array


  // Send a message via WebSocket
  const sendMessage = () => {
    if (inputMessage && selectedCustomer && ws) {
      const messageData = {
        data: inputMessage,
        sender: 'owner',
        customer_id: selectedCustomer.id, // Send message to the selected customer
      };

      console.log('my messages', messageData);
      ws.send(JSON.stringify(messageData));

      // Optimistically update the UI with the new message
      setMessages((prevMessages) => [...prevMessages, { message: inputMessage, sender: 'owner' }]);
      setInputMessage(''); // Clear the input field
    }
  };

  // Handle customer selection and load their messages
  const handleCustomerSelection = (customer) => {
    refetch()
    setSelectedCustomer(customer);
    setMessages(groupedMessages[customer.id].messages || []); // Load messages based on selected customer
    setNotifiedCustomers((prevNotifiedCustomers) =>
      prevNotifiedCustomers.filter(id => id !== customer.id)
    );
     // Open WebSocket connection for the selected customer
  };
// useEffect(()=>{
//   chatWith(groupid)
// },[groupid])


// useEffect(() => {
//   const intervalId = setInterval(() => {
//     refetch();
//   }, 1000); // 10000 ms = 10 seconds

//   return () => clearInterval(intervalId); // Clean up interval on component unmount
// }, [refetch]);

// console.log("notficccccc",notifications)


  return (



    <div className="flex flex-col lg:flex-row border rounded-lg h-[95%] w-[95%]">
      {/* Customer List */}
      <div className="lg:w-1/4 w-full bg-gray-100 border-b lg:border-r p-4 lg:border-b-0">
        <h3 className="text-lg font-semibold mb-4">Customers</h3>
        {customers.map((customer) => (
          <div
          key={customer.id}
          className={`cursor-pointer p-2 mb-2 rounded-md ${
            selectedCustomer?.id === customer.id
              ? 'bg-blue-200' // Color when selected
              : notifiedCustomers.includes(customer.id)
              ? 'bg-yellow-200' // Color when a message is received (notification)
              : 'bg-white hover:bg-gray-200' // Default color
          }`}
          onClick={() => handleCustomerSelection(customer)}
        >
          {customer.name}
        </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col w-full">
        {selectedCustomer ? (
          <>
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 p-3 rounded-lg max-w-xs flex flex-col ${
                    msg.sender === 'owner' && msg.customer_id ==selectedCustomer.id  ? 'bg-blue-100 ml-auto self-end' :
                    msg.sender === 'customer' && msg.customer_id ==selectedCustomer.id  ? 'bg-gray-100 self-start':null
                    
                    
                   
                  }`}
                >
                  {msg.customer_id ==selectedCustomer.id && msg.message}
                  <span className=' text-gray-600'>{new Date(msg.timestamp).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t flex">
              <input
                type="text"
                className="flex-grow border rounded-md p-2 mr-2 focus:outline-none"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a customer to chat</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatting;
