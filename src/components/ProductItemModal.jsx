import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50 flex-col">
        <div className="flex justify-end  p-2">
          <button onClick={onClose} className=" bg-red-500 flex rounded-full hover:bg-red-700">
           <CloseIcon  className='  text-white' />
          </button>
        </div>
      <div className="bg-white rounded-lg shadow-lg w-1/2 overflow-scroll h-full flex-grow">
        
        <div className="p-4 ">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
