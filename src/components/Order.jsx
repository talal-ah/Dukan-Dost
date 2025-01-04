import React, { useState,useEffect } from 'react';
import Modal from './ProductItemModal';
import { useOrder_statuesMutation } from '../reduxServices/Apis/ProductsApis';
import OrderTab from './OrderTab';
import AllocateDeliveryPersonModal from './AllocateDeliveryPersonModal';
import { useAllocateDeliveryMutation } from '../reduxServices/Apis/DeliveryPersonApi';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
// import connectWebSocket from './connectWebSocket';
const Order = ({ orders,accessToken,refetch }) => {

  const [allocatedelivery,{isLoading}]=useAllocateDeliveryMutation()
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderId ,setSelectedOrderId] = useState(""); // Example order ID

  // Handle modal open/close
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Handle allocating delivery person
  const handleAllocateDeliveryPerson = async (deliveryPersonId) => {
    console.log(`Allocated Delivery Person ID: ${deliveryPersonId} to Order ID: ${selectedOrderId}`);
    const formdata={delivery_person:deliveryPersonId, order:selectedOrderId}
    console.log("yaaa han datat",formdata)
    try {
     const resp=await allocatedelivery(formdata)
     if (resp.data) {
      console.log("deliveryallocated",resp.data)
      try {

        const response = await chaneorderstatus({order_id:selectedOrderId,order_status:'SHIPPED',accessToken:accessToken})
        if (response.data) {
          refetch()
        console.log('Order status updated:', response.data);
  
          
        }
        else{
        console.log('Not Updated:');
          
        }
  
        // Optionally, refresh the orders list or update the order status locally in state
      } catch (error) {
        console.error('Error updating order status:', error);
      }
      
     }
      
    } catch (error) {
      console.log("errorerror",error)
      
    }
    
  };




const [chaneorderstatus,{isLoadin}]=useOrder_statuesMutation()
  const toggleOrderItems = (order) => {
    setExpandedOrder(expandedOrder === order ? null : order);
  };

  const closeModal = () => {
    setExpandedOrder(null);
  };

  const handlePrint = () => {
    const printContents = document.getElementById('printable-area').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore the original content after printing
  };
  const [isshiped,setIsshiped]=useState(false)
  const updateOrderStatus = async (orderId, newStatus) => {
    if (newStatus=='SHIPPED') {
      setSelectedOrderId(orderId)
      handleOpenModal()
     
      // setIsshiped(True)
      
    }
    else{
      try {

        const response = await chaneorderstatus({order_id:orderId,order_status:newStatus,accessToken:accessToken})
        if (response.data) {
          refetch()
        console.log('Order status updated:', response.data);
  
          
        }
        else{
        console.log('Not Updated:');
          
        }
  
        // Optionally, refresh the orders list or update the order status locally in state
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }
   
  };

  function setstatus(status) {
    setStatusFilter(status)
    refetch()
    
  }
 
  useEffect(() => {
    if (statusFilter === 'All' ) {
      setFilteredOrders(
        [...orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
      refetch()
    } else {
      setFilteredOrders(
        orders
          .filter(order => order.order_status === statusFilter)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
      refetch()
    }
  }, [orders, statusFilter]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000); // Polling every 5 seconds

    return () => clearInterval(interval);
  }, []);
 const tab=['All', 'PLACED','PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED']

  return (
    <div className="container mx-2 my-2  overflow-auto  ">
     
        <AllocateDeliveryPersonModal
            orderId={selectedOrderId}
            open={modalOpen}
            handleClose={handleCloseModal}
            handleAllocate={handleAllocateDeliveryPerson}
          />
      <OrderTab tab={tab}  setstatus={setstatus} />
      <div className="shadow-lg rounded-lg ">
        <table className="min-w-full bg-white">
          <thead className=" bg-blue-600 text-white">
            <tr className='items-center'>
            <th className="py-3 px-6  text-center">Sr.No</th>

              <th className="py-3 px-6  text-center">Order ID</th>
              <th className="py-3 px-6  text-center">Order BY</th>
              <th className="py-3 px-6  text-center">Total Price</th>
              <th className="py-3 px-6  text-center">Payment Method</th>
              <th className="py-3 px-6  text-center">Payment Status</th>
              <th className="py-3 px-6  text-center">Order Status</th>
              <th className="py-3 px-6  text-center">Time</th>


              <th className="py-3 px-6  text-center">Actions</th>
          

            </tr>
          </thead>
          <tbody className="text-gray-700  ">
            {filteredOrders.map((order,index) => (
              <React.Fragment key={order.id} className='overflow-y-scroll h-[400px]'>
                <tr className={`${ order.order_status === 'PLACED'?' bg-yellow-100':'"hover:bg-gray-100"'}`}>
                <td className={`py-3 px-6 border-b border-gray-200 text-center  `}>{index+1}</td>

                  <td className="py-3 px-6 border-b border-gray-200 text-center">{order.id}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-center">{order.name}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-center">{order.total_price}.Rs</td>
                 
                  <td className="py-3 px-6 border-b border-gray-200 text-center">{order.payment_method}  </td>
                 
                  <td className="py-3 px-6 border-b border-gray-200 text-center">{order.payment_status?<DoneIcon   className=' font-bold text-green-600'/>:<CloseIcon  className=' font-bold text-red-600'/>}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-center">
                    <span
                      className={`${
                        order.order_status === 'PLACED'
                          ? 'bg-yellow-200 text-yellow-800'
                          :order.order_status === 'PACKED'
                          ? 'bg-purple-800  text-purple-800'
                          : order.order_status === 'SHIPPED'
                          ? 'bg-blue-200 text-blue-800'
                          : order.order_status === 'DELIVERED'
                          ? 'bg-green-200 text-green-800'
                          : order.order_status === 'CANCELLED'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-gray-200 text-gray-800'
                      } text-sm font-semibold px-2 py-1 rounded-full`}
                    >
                      <select
                      className="ml-4 rounded  focus:border-blue-500 border border-white"
                      value={order.order_status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    >
                      <option className=' text-black' value="PLACED">PLACED</option>
                      <option className=' text-black' value="PACKED">PACKED</option>
                      <option className=' text-black' value="SHIPPED">SHIPPED</option>
                      <option className=' text-black' value="DELIVERED">DELIVERED</option>
                      <option className=' text-black' value="CANCELLED">CANCELLED</option>
                    </select>
                    </span>
                    
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-center"> {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}</td>

                  <td className="py-3 px-6 border-b border-gray-200">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => toggleOrderItems(order)}
                    >
                      {expandedOrder === order ? 'Hide Items' : 'View Items'}
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying order details */}
      <Modal isOpen={expandedOrder !== null} onClose={closeModal}>
        {expandedOrder && (
          <div className=' '>
            <div id="printable-area" className=''>
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <p><strong>Order ID:</strong> {expandedOrder.id}</p>
              <p><strong>Customer:</strong> {expandedOrder.name}</p>
              <p><strong>Total Price:</strong> Rs.{expandedOrder.total_price}</p>
              <p><strong>Payment Method:</strong> {expandedOrder.payment_method}</p>
              <p><strong>Payment Status:</strong> {expandedOrder.payment_status?"Paid":"unPaid"}</p>
              
              <p><strong>Address:</strong> {expandedOrder.address}</p>
              <p><strong>Phone Number:</strong> {expandedOrder.user_details.phone_number}</p>
              <h3 className="text-xl font-semibold mt-4">Order Items</h3>
              <OrderItemsTable orderItems={expandedOrder.orderitems} />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handlePrint}
              >
                Print Order
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const OrderItemsTable = ({ orderItems }) => (
  <table className=" w-full bg-gray-50 mt-4 rounded-lg">
   

    <thead>
      <tr className="bg-gray-200 text-gray-600 items-center uppercase space-x-2 text-sm leading-normal">
      <th className="py-3 px-6  text-center ">Sr.No </th>

        <th className="py-3 px-6 text-center">Product  ID      </th>
        <th className="py-3 px-6 text-center">Product Name    </th>

        <th className="py-3 px-6 text-center">   Quantity    </th>
        <th className="py-3 px-6 text-center">   Price   </th>
      </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
      {orderItems.map((item,index) => (
        <tr key={item.id} className="border-b   text-center border-gray-200 hover:bg-gray-100">
          <td className="py-3 border  text-center px-6">{index +1}</td>

          <td className="py-3  text-center px-6">{item.product}</td>
          <td className="py-3  text-center mx-2">{item.name}</td>

          <td className="py-3  text-center px-6">{item.quantity}</td>
          <td className="py-3  text-center px-6">{item.price}.Rs</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Order;
