import React, { useState } from 'react';
import { useDeliveryPersonListQuery } from '../reduxServices/Apis/DeliveryPersonApi';
// Dummy data for delivery persons
import { useSelector } from 'react-redux';
const deliveryPersons = [
  { id: 1, name: 'John Doe', vehicle_number: 'ABC123' },
  { id: 2, name: 'Jane Smith', vehicle_number: 'XYZ789' },
  { id: 3, name: 'Bob Brown', vehicle_number: 'LMN456' },
];

// Modal Component
const AllocateDeliveryPersonModal = ({ orderId, open, handleClose, handleAllocate }) => {
    const dukandata = useSelector(state => state.dukandata);  
    const {data,isSuccess,refetch}=useDeliveryPersonListQuery(dukandata.dukaanId)
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDeliveryPerson) {
      handleAllocate(selectedDeliveryPerson);
      handleClose(); // Close modal after allocation
    } else {
      alert('Please select a delivery person');
    }
  };

  if (!open) return null; // Return null if the modal is not open

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Allocate Delivery Person for Order #{orderId}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Delivery Person
            </label>
            <select
              value={selectedDeliveryPerson}
              onChange={(e) => setSelectedDeliveryPerson(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select a Delivery Person
              </option>
              {data.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name} - {person.vehicle_number}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            Allocate
          </button>
        </form>

        <button
          className="mt-4 text-sm text-gray-600 underline"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Main Component
// const App = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedOrderId] = useState(1); // Example order ID

//   // Handle modal open/close
//   const handleOpenModal = () => setModalOpen(true);
//   const handleCloseModal = () => setModalOpen(false);

//   // Handle allocating delivery person
//   const handleAllocateDeliveryPerson = (deliveryPersonId) => {
//     console.log(`Allocated Delivery Person ID: ${deliveryPersonId} to Order ID: ${selectedOrderId}`);
//     // Send selectedDeliveryPersonId to your backend API to allocate the person to the order.
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={handleOpenModal}
//         className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
//       >
//         Allocate Delivery Person for Order #{selectedOrderId}
//       </button>

//       <AllocateDeliveryPersonModal
//         orderId={selectedOrderId}
//         open={modalOpen}
//         handleClose={handleCloseModal}
//         handleAllocate={handleAllocateDeliveryPerson}
//       />
//     </div>
//   );
// };

export default AllocateDeliveryPersonModal;
