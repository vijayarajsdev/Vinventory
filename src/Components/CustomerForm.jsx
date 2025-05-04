import React from "react";
import "../styles/CustomerForm.css"; // Assuming you have a CSS file for styling
const CustomerForm = () => {
  return (
    <div className="customer-form">
      <div>
        <h2>New Customer</h2>
      </div>
      <div className="customer-form-wrapper">
        <div className="customer-form-container">
          <h3 className="h3-style-label">NAME</h3>
          <input
            className="styled-input"
            type="text"
            placeholder="Enter Customer Name"
          />
        </div>
        <div className="customer-form-container">
          {" "}
          <h3 className="h3-style-label">COMPANY NAME</h3>
          <input
            className="styled-input"
            type="text"
            placeholder="Enter Company Name"
          />
        </div>
        <div className="customer-form-container">
          {" "}
          <h3 className="h3-style-label">CONTACT</h3>
          <input
            className="styled-input"
            type="text"
            placeholder="Enter Contact Number"
          />
        </div>
        <div className="customer-form-container">
          {" "}
          <h3 className="h3-style-label">EMAIL</h3>
          <input
            className="styled-input"
            type="text"
            placeholder="Enter Email Address"
          />
        </div>
        <div className="customer-form-container">
          {" "}
          <h3 className="h3-style-label">ADDRESS</h3>
          <input
            className="styled-input"
            type="text"
            placeholder="Enter Address"
          />
        </div>
        <div className="customer-form-container">
          {" "}
          <h3 className="h3-style-label">CITY</h3>
          <input
            className="styled-input"
            type="text"
            placeholder="Enter City"
          />
        </div>
        <div className="customer-form-container">
          {" "}
          <h3 className="h3-style-label">ZIP CODE</h3>
          <input
            className="styled-input"
            type="text"
            placeholder="Enter Zip Code"
          />
        </div>

        <div className="customer-form-container">
          {" "}
          <h3 className="h3-style-label">GSTIN</h3>
          <input
            className="styled-input"
            type="text"
            placeholder="Enter GSTIN"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
