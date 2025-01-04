import React, { useState } from 'react';

const GenerateReportPopup = ({ setdates }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Handle opening/closing the popup
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure startDate and endDate are not empty
    if (startDate && endDate) {
        setdates(startDate, endDate);  // Pass the dates to the report generation function
      togglePopup(); // Close the popup after submission
    } else {
      alert('Please select both start and end dates');
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full ">
      {/* Button to open the popup */}
      <button 
        className="   bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={togglePopup}
      >
        Generate Report
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Generate Report</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="button" 
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2 hover:bg-gray-400"
                  onClick={togglePopup}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateReportPopup;
