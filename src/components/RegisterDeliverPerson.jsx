import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Grid } from '@mui/material';
import { useDeliveryPersonRegisterMutation } from '../reduxServices/Apis/DeliveryPersonApi';
import { useSelector } from 'react-redux';


function RegisterDeliverPerson() {
  const [registerdeliveryperson, { isLoading }] = useDeliveryPersonRegisterMutation()
  const dukandata = useSelector(state => state.dukandata);
// store: dukandata.dukaanId

  const [formData, setFormData] = useState({
    phone_number: '+923',
    name: '',
    vehicle_number:'',
    password:"",
    riderStore:dukandata.dukaanId
  });

  const [errors, setErrors] = useState({
    phone_number: '',
    name: '',
    vehicle_number: '',
    riderStore: '',
    password:"",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Phone number validation (+92XXXXXXXXXX)
    const phoneRegex = /^\+923\d{9}$/;
    if (!phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be in the format '+92XXXXXXXXXX'.";
      valid = false;
    }

    // User name validation
    if (formData.name.trim() === '') {
      newErrors.name = 'User name is required.';
      valid = false;
    }

    // Password validation
    if (formData.vehicle_number.trim() === '') {
      newErrors.vehicle_number = 'Enter vehicle_number';
      valid = false;
    }

    // Confirm password validation
    if (formData.riderStore.trim() === '') {
      newErrors.riderStore = 'Store is Not Created ';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data:', formData);

      // Make API call to register user
      // axios.post('/api/register-user', formData)
      //   .then(response => {
      //     console.log('User registered:', response.data);
      //   })
      //   .catch(error => {
      //     console.error('Error registering user:', error);
      //   });
    }
  };

  const handlePhoneNumberChange = (text) => {
    // Ensure that the phone number always starts with "+92"
    if (text.target.value === '' || text.target.value === '+92' || text.target.value === '+9' || text.target.value === '+') {
      setFormData({
        ...formData,
        phone_number: '+92',
      });
    } else {
      setFormData({
        ...formData,
        phone_number: text.target.value,
      });
         
    }
};

// register rider
async function registerRider() {
  if (validateForm()) {
    
    try {
        const response = await registerdeliveryperson(formData)
        if (response.data) {

            // await storeToken(response.data.token)
            console.log(response.data.token)
           
            alert('Riderregistered')
            setFormData({
              phone_number: '+923',
              name: '',
              vehicle_number: '',
              password:"",
              riderStore:dukandata.dukaanId
            });

        }

        else if (response.error) {
            // Error response from server
            console.log(response.error);
            const errorMessages = Object.values(response.error.data).flat();
            alert(errorMessages.join('\n'));
            // /alert(`Error: ${response.error.data[1] || 'Failed to Register'}`);
        }
    } catch (response) {
      console.log('Server responded with status:',response.error);

    }
    
  }
  
}
 

  return (
    <Box className=' rounded-2xl' sx={{ maxWidth: 600, margin: 'auto', mt: 5, padding: 3, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Register Rider
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="phone_number"
              fullWidth
              variant="outlined"
              value={formData.phone_number}
              onChange={handlePhoneNumberChange}
              error={!!errors.phone_number}
              helperText={errors.phone_number}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="User Name"
              name="name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>


          <Grid item xs={12}>
            <TextField
              label="vehicle_number"
              name="vehicle_number"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.vehicle_number}
              onChange={handleChange}
              error={!!errors.vehicle_number}
              helperText={errors.vehicle_number}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="passward"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              required
            />
          </Grid>

          

          <Grid item xs={12}>
            <Button onClick={registerRider} type="submit" variant="contained" fullWidth color="primary">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default RegisterDeliverPerson;


