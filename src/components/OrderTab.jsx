import React, { useState } from 'react';

const OrderTab = ({setstatus,tab}) => {
  const [activeTab, setActiveTab] = useState('all');


  return (
    <div className="flex space-x-1 mr-auto  bg-gray-200 p-1 w-full mb-2 rounded-lg">
      {tab.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === tab.toLowerCase() ? 'bg-white shadow' : ''
          }`}
          onClick={() => {setActiveTab(tab.toLowerCase());setstatus(tab)}}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default OrderTab;
