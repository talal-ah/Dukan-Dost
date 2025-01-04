
import React, { useState,useEffect } from 'react';
import RegisterDeliverPerson from '../components/RegisterDeliverPerson'
import DeliverypersonAllocations from '../components/DeliverypersonAllocations'
import DeliverypersonsList from '../components/DeliverypersonsList'
import OrderTab from '../components/OrderTab'

function DeliveryPerson() {
  const [statusFilter, setStatusFilter] = useState('Register');

    const tab=['Register', 'Allocation', 'Riders']
    function setstatus(status) {
        setStatusFilter(status)
     
        
      }
  return (
    
    
    <div className=' container mx-2 my-2 overflow-auto  '>
    <OrderTab tab={tab}  setstatus={setstatus} />
   <div>
    {
        statusFilter=='Register'?
        <RegisterDeliverPerson/>
        :
        statusFilter=='Allocation'?
        <DeliverypersonAllocations/>
        :
        statusFilter=='Riders'?
        <DeliverypersonsList/>
        :
        <RegisterDeliverPerson/>


    }
   </div>


    </div>
    
  
  )
}

export default DeliveryPerson