import React, { useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'
import Navbar from '../components/Navbar'
import AddInventery from '../components/AddInventery'
import { useEffect as UseEffect, useState as UseState } from 'react'
import { useLoggeduserProfileQuery as UseLoggeduserProfileQuery } from '../reduxServices/Apis/UserAuthapi'
import { GetToken } from '../services/storetoken'
import { useNavigate } from 'react-router-dom'
import DukanCreate from '../components/DukanCreate'
import { useDispatch } from 'react-redux'
import { setProfileData } from '../reduxServices/slicers/profileSlice'
import { useSelector   } from 'react-redux';
import SideBar from '../components/SideBar'
import Profile from '../components/Profile'
import { useProductShowQuery } from '../reduxServices/Apis/ProductsApis';
import { data } from 'autoprefixer'
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import Charts from '../components/Charts'
import Settings from '../components/Settings'
import Discounts from '../components/Discounts'
import Order from '../components/Order'
import { useOrderListQuery } from '../reduxServices/Apis/ProductsApis'
import DeliveryPerson from './DeliveryPerson'
import Chating from './Chating'

function Dashboard() {
  const [notifiedCustomers, setNotifiedCustomers] = useState([]);
  
  const obj =  useSelector(state => state.componentName);
  const componentName=obj.componentName
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  // connection sockets 
const [ws, setWs] = useState(null);
const [messages, setMessages] = useState([]);
useEffect(() => {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}, []);



const chatWith = () => {
  // Check if a WebSocket connection is already open
  if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('WebSocket connection is already open');
      return;
  }

  if (ws) {
      ws.close(); // Close any existing WebSocket connections
  }

  // Open a new WebSocket connection
  const newWs = new WebSocket(`ws://127.0.0.1:8000/ws/notification/`);
  setWs(newWs);

  newWs.onopen = () => {
      console.log('WebSocket connection opened');
  };

  newWs.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log('New message received from WebSocket:', newMessage);
      if(newMessage.store_id==dukandata.dukaanId)
        {
        setNotifiedCustomers([newMessage.customer_id]);

      }
      

      // Append the new message to the current list of messages
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      if (Notification.permission === 'granted'&& newMessage.sender !='owner' ) {
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
  chatWith()
}, []);








  // const [profile ,setProfie]=UseState({})
 
  const [token, setToken] = UseState({})
  // const [data, setData] = UseState({})


  UseEffect(() => {
    
      const token = GetToken()
      if (token) {

        setToken({
          'access': token.access_token,
          'refresh': token.Refresh_token

        })



      }
  


  
   

  }, []);
  const {data:orderList,isSuccess,refetch}=useOrderListQuery({accessToken:token.access})
  
 
 
  async function getdata() {
    const  { data, isSuccess } = await UseLoggeduserProfileQuery(token.access)
    if (data) {
      
      dispatch(
        setProfileData({
          user_name:data.user_name,
          phone_number:data.phone_number,
          user_Type:data.user_Type,
          id:data.id
  
        })
      );
       


    }
   

 }
 
getdata()

 
// async function productdata() {
// const  { data, isSuccess } = await useProductShowQuery(token.access)
// if (isSuccess) {
//   setData(data)
  
 
 
// }
// else{
//   console.log('error')
// }


// }

// productdata()

 const profile =  useSelector(state => state.profile);


  // console.log(token)
  console.log(profile)


console.log(componentName)
const [orders,setOrders]=useState([])
useEffect(()=>{
  if (orderList) {
console.log('orderList',orderList.data)
setOrders(orderList.data)
  }
  else{
console.log('error')


  }


},[orderList])

const myarry=['Home']

console.log('notify',notifiedCustomers)


// for notifications 
const dukandata = useSelector((state) => state.dukandata);
 
// useEffect(()=>{
//   if (dukanda) {
//     consolelog('notofication agiya dukan ka',dukanda)
    
//   }

// },[])

  return (
    <div className="    flex flex-col ">
      {/* <Navbar className=" shadow-xl"  navbaritems={myarry} userstatus="dashboard" notify={()=>{<NotificationAddOutlinedIcon/>}} bgc="#1C4E80"   /> */}
      <div className='fixed top-0 left-0 h-screen flex flex-row w-full lg:px-5 py-1  mt-4'>
        <SideBar />
        
          {/* Conditionally render Profile component */}
          {componentName  === 'dashboard' ? <Charts /> : null}
          {componentName  === 'inventery' ? <AddInventery/> : null}
          {componentName  === 'profile' ? <Profile/> : null}
    
          {componentName  === 'discounts' ? <Discounts/> : null}
          {componentName  === 'riders' ? <DeliveryPerson/> : null}
          {componentName  === 'chating' ? <Chating notifications={notifiedCustomers} /> : null}


          {componentName  === 'order' ? <Order orders={orders} accessToken={token.access} refetch={refetch} /> : null}

          
          {componentName  === '' ? <Profile/> : null}
          
          




          
       
      </div>


    </div>
  )
}

export default Dashboard