import { Button } from '@medusajs/ui';
import React, { useState } from 'react';

const PaymentForm = () => {
  const [showUpiPopup, setShowUpiPopup] = useState(false);
  
  const handleUpiClick = () => {
    setShowUpiPopup(true);
  };

  const handleCloseClick = () => {
    setShowUpiPopup(false);
  };

  return (
    <>
      {/* UPI Popup page */}
      {showUpiPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={handleCloseClick}>
          <div className="bg-white p-8 rounded-lg shadow-lg" style={{ width: "600px", height: "auto" }} onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button className="absolute top-0 right-0 m-4 p-2 text-gray-500 hover:text-gray-700" onClick={handleCloseClick}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* UPI details */}
            <div>
              <p>Enter your UPI details here</p>
              {/* Additional UPI input fields can be added here */}
            </div>
            {/* Confirm button */}
            <Button
              type="button" // Set type to "button" to prevent form submission
              onClick={handleCloseClick}
              className="bg-orange-400 text-black font-bold py-2 px-4 rounded"
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
