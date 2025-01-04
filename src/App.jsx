import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import LoginPage from "./pages/LoginPage";
import RegistraionPage from './pages/RegistrationPage'
import DukanCreate from "./components/DukanCreate";
import HomePage from "./pages/HomePage";
import MyLocation from "./components/DukanLocation";
import OrdersForDeliveryPeraon from "./pages/OrdersForDeliveryPeraon";
import DeliveryPersonLogin from "./components/DeliveryPersonLogin ";
import SocketTest from "./components/socketTest";
import React, { useEffect } from 'react';
import { GetToken } from "./services/storetoken";
import { Navigate } from "react-router-dom";
 


function App() {
  // const [token, setToken] = useState('');

  const gttoken = GetToken();
  const token =gttoken.access_token
//   useEffect(() => {
//     const token = GetToken();
//     if (token) {
//         setToken(token.access_token);
//     }
// }, []);

  

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={!token ?<HomePage />:<Navigate to="/dashboard" />} />
        <Route path="*" element={!token ?<HomePage />:<Navigate to="/dashboard" />} />
     
        <Route path="/login" element={!token ?<LoginPage />:<Navigate to="/dashboard" />} />

        <Route path="/dashboard" element={token ?<Dashboard />:<Navigate to="/login" />} />
        <Route path="/registration" element={!token ?<RegistraionPage />:<Navigate to="/dashboard" /> }/>
        <Route path="/Profile" element={<DukanCreate />} />
        <Route path="/locat" element={<MyLocation />} />
        <Route path="/Rider" element={<OrdersForDeliveryPeraon />} />
        <Route path="/riderLogin" element={<DeliveryPersonLogin />} />
        <Route path="/test" element={<SocketTest/>} />









      </Routes>
    </BrowserRouter>


  )
}

export default App
