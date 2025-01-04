import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useDispatch,useSelector  } from 'react-redux';
import { useLoginDeliveryPersonMutation } from '../reduxServices/Apis/DeliveryPersonApi';
import { setDeliveryPerson } from '../reduxServices/slicers/deliveryPersonSlice ';
import { useNavigate } from 'react-router-dom';
const DeliveryPersonLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
    const navigate = useNavigate();
  // RTK Query hook for the login mutation
  const [loginDeliveryPerson, { isLoading }] = useLoginDeliveryPersonMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Call the login mutation with phoneNumber and password
      const userData = await loginDeliveryPerson({ phone_number: phoneNumber, password }).unwrap();
if (userData) {
     // Save the logged-in user's data in the Redux store
     dispatch(setDeliveryPerson(userData));
     console.log('Login userData:', userData);
     alert('Login successful');
     navigate('/rider')
     
    
}
else {
    alert('Login Unsuccessful');

}
     


      
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid phone number or password');
    }
  };
  const deliveryPerson = useSelector((state) => state.deliveryPerson.person);
  console.log('Login sleccccccter:', deliveryPerson);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Delivery Person Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="text-lg"
              required
            />
          </div>

          <div className="mb-6">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-lg"
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryPersonLogin;
