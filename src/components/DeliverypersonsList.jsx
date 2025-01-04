
import React, { useState,useEffect } from 'react';
import { useDeliveryPersonListQuery,useDeliveryPersonDeleteMutation,useDeliveryPersonEditMutation } from '../reduxServices/Apis/DeliveryPersonApi';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  IconButton,
  TableContainer
} from '@mui/material';
import { Close } from '@mui/icons-material';

function DeliverypersonsList() {
  const dukandata = useSelector(state => state.dukandata);
const [ridersData,setRidersData]=useState([])
  const {data,isSuccess,refetch}=useDeliveryPersonListQuery(dukandata.dukaanId)
  const [updateDeliveryPerson] = useDeliveryPersonEditMutation();
  const [deleteDeliveryPerson] = useDeliveryPersonDeleteMutation();
  const [selectedRider, setSelectedRider] = useState(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [updatedRiderData, setUpdatedRiderData] = useState({
    name: '',
    phone_number: '',
    vehicle_number: '',
    pk:selectedRider
    
  });
  
  useEffect(()=>{

    
    if (data){

      setRidersData(data)
   
    }
   

  },[data])
  // 

  const handleEditClick = (rider) => {
    setUpdatedRiderData({
      ...updatedRiderData,
      pk: rider,
    }); // Set selected rider for editing
    setOpenEditPopup(true); // Open edit popup
  };

  const handleEditSubmit = async () => {
    console.log('updatedRiderData',updatedRiderData)
    try {
      await updateDeliveryPerson(updatedRiderData); // Update delivery person
      refetch(); // Refetch data after successful update
      setOpenEditPopup(false); // Close edit popup after successful update
    } catch (error) {
      console.error('Error updating delivery person:', error);
      // Handle edit failure if needed (e.g., display error message)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRiderData({
      ...updatedRiderData,
      [name]: value,
    });
     
  };

  const handleCloseEditPopup = () => {
    setSelectedRider(null);
    setUpdatedRiderData({
      name: '',
      phone_number: '',
      vehicle_number: '',
      pk:'',
    });
    setOpenEditPopup(false);
  };



  // 
  const handleDelete = (riderId) => {
    deleteDeliveryPerson(riderId)
      .then((response) => {
        console.log('Delivery person deleted successfully:', response);
        refetch();
      })
      .catch((error) => {
        console.error('Error deleting delivery person:', error);
      });
  };

console.log(ridersData)
  return (
    <div className="container mx-auto overflow-auto">
    <h2 className="text-2xl font-bold mb-4">Delivery Persons</h2>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Vehicle Number</TableCell>
            <TableCell>Password</TableCell>

            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ridersData.map((rider) => (
            <TableRow key={rider.id}>
              <TableCell>{rider.name}</TableCell>
              <TableCell>{rider.phone_number}</TableCell>
              <TableCell>{rider.vehicle_number}</TableCell>
              <TableCell>{rider.password}</TableCell>

              <TableCell>{rider.created_at}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditClick(rider.id)}>
                  Edit
                </Button>
                <Button className='ml-1 bg-red-600' variant="contained"   onClick={() => handleDelete(rider.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Dialog onClose={handleCloseEditPopup} aria-labelledby="edit-delivery-person-dialog" open={openEditPopup}>
        <DialogTitle id="edit-delivery-person-dialog">Edit Delivery Person</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the details of the delivery person.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name='name'
            type="text"
            fullWidth
            value={updatedRiderData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            name="phone_number"
   
            type="text"
            fullWidth
            value={updatedRiderData.phone_number}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Vehicle Number"
             name="vehicle_number"
            type="text"
            fullWidth
            value={updatedRiderData.vehicle_number}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditPopup}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleEditSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
  </div>
  )
}

export default DeliverypersonsList
