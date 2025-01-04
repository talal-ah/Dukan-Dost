import React, { useEffect, useState } from 'react';
import { useRiderOrdersListQuery } from '../reduxServices/Apis/DeliveryPersonApi';
import { useSelector } from 'react-redux';
import { useUpdateorderstatusbyriderMutation } from '../reduxServices/Apis/DeliveryPersonApi';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
const OrdersForDeliveryPerson = () => {
 
  const [updatestatus,{isLoading}]=useUpdateorderstatusbyriderMutation()
  const deliveryPerson = useSelector((state) => state.deliveryPerson.person);
  console.log("thisis delllll",deliveryPerson.delivery_person_id)
  
  const id=deliveryPerson.delivery_person_id
  console.log("thisis iddddddddd ddddd   delllll",id)

  // useEffect(()=>{
  //   setId(deliveryPerson.delivery_person_id)
    


  // },[deliveryPerson])
  // console.log('Delivery Person ID:', deliveryPerson.delivery_person_id);

  const { data: orders, isSuccess,refetch } = useRiderOrdersListQuery({id});
const [rider_Detail,setRider_Detail]=useState([])
const[orderDetails,setOrderDetails]=useState([])
  useEffect(() => {
    
    if (isSuccess) {
      // console.log("Fetched Orders Data:", orders);
      // console.log("Fetched delivery_person_details Data:", orders[0].delivery_person_details)
      console.log("Fetched order_details Data:", orders[0])
      setRider_Detail(orders[0].delivery_person_details)
      setOrderDetails(orders[0])
      

    }
    console.log('rider_Detail',rider_Detail)
      console.log('orderDetails',orderDetails)
  }, [isSuccess, orders]);

  async function statusDeliverd(id) {
    console.log('idddd',id)
    try {
      const resp=await updatestatus(id)
      if (resp.data) {
        alert('deliverd')

        consol.log(orderDetails)
        await refetch();
        

        
      }
      else{
        alert('undeliver')

      }
      
    } catch (error) {
      console.log(error)
      
    }

    
  }
  useEffect(() => {
    // Refetch the orders every 5 seconds
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [refetch]);
rider_Detail && console.log('rider_Detail',rider_Detail)
  return (
    
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Section */}
      <div className="mb-6 bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-semibold mb-2">Delivery Person Profile</h1>
        <p className="text-lg">Name: {rider_Detail.name}</p>
        <p className="text-lg">Phone #: {rider_Detail.phone_number}</p>
        <p className="text-lg">Vechile #: {rider_Detail.vehicle_number}</p>
      </div>

      {/* Orders Table Section */}
      <h1 className="text-2xl font-semibold text-center mb-4">Allocated Orders</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="py-3 px-4 text-left">Order ID</th>
            <th className="py-3 px-4 text-left">name</th>
            <th className="py-3 px-4 text-left">payment_method</th>

            <th className="py-3 px-4 text-left">payment_status</th>


            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Address</th>

            <th className="py-3 px-4 text-left">Allocated At</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && orders.length > 0 ? ( 
            orders.map(order => (
              <tr key={order.id} className="border-b">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.order_details.name}</td>
                <td className="py-3 px-4">{order.order_details.payment_method}</td>
                <td className="py-3 px-4">{order.order_details.payment_status?<DoneIcon className=' font-bold text-green-600' />:<CloseIcon className=' font-bold text-red-600' />}</td>
                <td className="py-3 px-4">{order.order_details.order_status}</td>
                <td className="py-3 px-4">{order.order_details.address}</td>

                <td className="py-3 px-4">{order.allocated_at}</td>

                <td className="py-3 px-4">
                  {order.order_details.order_status == 'DELIVERED'?  <div  className="   bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                      Mark as Delivered
                    </div>:
                    <button onClick={()=>{statusDeliverd(order.id)}} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                      Mark as Delivered
                    </button>
                   
                  }
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-3 px-4 text-center text-gray-600">
                No allocated orders available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersForDeliveryPerson;
