import { PaymentSession } from "@medusajs/medusa";
import React, { useState } from "react";
import Button from "@/components/common/Button";
import { RadioGroup } from "@headlessui/react";


type PaymentContainerProps = {
  paymentSession: PaymentSession;
  selectedPaymentOptionId: string | null;
  disabled?: boolean;
};

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selectedPaymentOptionId,
  disabled = false,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showUpiPopup, setShowUpiPopup] = useState(false); // Add state for UPI pop-up

  const [cardDetails, setCardDetails] = useState({
    cardName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const handleRadioClick = () => {
    if (paymentSession.provider_id === "upi") {
      // Don't show pop-up for UPI
      return;
    }
    setShowPopup(true);
    // Additional logic for handling radio button click if needed
  };

  const handleUpiRadioClick = () => {
    if (paymentSession.provider_id === "card") {
      // Don't show pop-up for UPI
      return;
    }
    setShowUpiPopup(true); // Show UPI pop-up
    // Additional logic for handling radio button click if needed
  };

  const handleCloseClick = () => {
    setShowPopup(false);
    setShowUpiPopup(false); // Close UPI pop-up
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let filteredValue = value;

    // Filter input based on field name
    if (name === "cardName") {
      // Only allow alphabetic characters and spaces for card holder's name
      filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (name === "cardNumber" || name === "cvv" || name === "expiryDate") {
      // Allow numerical characters and specific special characters for card number, CVV, and expiry date
      filteredValue = value.replace(/[^\d/-]/g, '');
    }

    setCardDetails((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));
  };

  const handleConfirmClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent event propagation
    console.log("Card details:", cardDetails);
    // Additional logic for handling confirm button click
    setShowPopup(false); // Close the pop-up after confirming card details
    setShowUpiPopup(false); // Close the UPI pop-up after confirming details
  };

  return (
    <>
      <RadioGroup.Option
        key={paymentSession.id}
        value={paymentSession.provider_id}
      >
        <div className="form-check flex justify-start gap-3">
          <input
            id="card"
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            disabled={disabled}
            onClick={() => handleRadioClick(paymentSession.provider_id)}
          />
          <label className="form-check-label" htmlFor="card">
            <span className="font-semibold">Add Debit/Credit/ATM Card</span>
            <br />
            {/* Insert image tags with Tailwind CSS classes here */}
          </label>
        </div>

        <div className="form-check mt-6 flex justify-start gap-3">
          <input
            id="upi"
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            disabled={disabled}
            onClick={() => handleUpiRadioClick(paymentSession.provider_id)}
          />
          <label className="form-check-label" htmlFor="upi">
            <span className="font-semibold">UPI</span>
          </label>
        </div>

        <div className="form-check mt-6 flex justify-start gap-3">
          <input
            id="cod"
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            disabled={disabled}
          />
          <label className="form-check-label font-semibold" htmlFor="cod">
            Cash on Delivery
          </label>
        </div>
        <br />
      </RadioGroup.Option>

      {/* Popup page for Debit/Credit/ATM Card */}
      {showPopup && paymentSession.provider_id !== "cod" && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={handleCloseClick}>
          <div className="bg-white p-8 rounded-lg shadow-lg" style={{ width: "600px", height: "auto" }} onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button className="absolute top-0 right-0 m-4 p-2 text-gray-500 hover:text-gray-700" onClick={handleCloseClick}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Card details */}
            <div>
              <label className="block mb-2" htmlFor="cardName"> Card Holder's Name:</label>
              <input
                id="cardName"
                type="text"
                name="cardName"
                value={cardDetails.cardName}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 mb-4"
              />
              <label className="block mb-2" htmlFor="cardNumber">Card Number:</label>
              <input
                id="cardNumber"
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 mb-4"
              />
              <label className="block mb-2" htmlFor="cvv">CVV:</label>
              <input
                id="cvv"
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 mb-4"
              />
              <label className="block mb-2" htmlFor="expiryDate">Expiry Date:</label>
              <input
                id="expiryDate"
                type="text"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 mb-4"
              />
            </div>
            {/* Confirm button */}
            <Button
              type="button" // Set type to "button" to prevent form submission
              onClick={(e) => handleConfirmClick(e)}
              className="bg-orange-400 text-black font-bold py-2 px-4 rounded"
            >
              Confirm
            </Button>
          </div>
        </div>
      )}

      {/* Popup page for UPI */}
      {showUpiPopup && paymentSession.provider_id !== "cod" && (
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
              <label className="block mb-2 ml-36 font-bold" htmlFor="upiId"> UPI ID : shahrushabh3954@okicici </label>
              <div className="border border-black p-5 h-3/4">
              <img src="https://ik.imagekit.io/dp5g6xsts/QR%20code.jpeg?updatedAt=1713380070806" alt=""
                className="h-64 w-60 flex justify-center m-auto" />
              <p className="flex justify-center bg-sky-300 w-fit m-auto mt-2">Scan To Pay</p>  
              </div>
            </div>
            {/* Confirm button */}
            <Button
              type="button" // Set type to "button" to prevent form submission
              onClick={(e) => handleConfirmClick(e)}
              className="bg-orange-400 text-black font-bold py-2 px-4 rounded mt-6"
            >
              Confirm
            </Button>
          </div>
        </div>
      )}

    </>
  );
};

export default PaymentContainer;
