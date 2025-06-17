import React, { useState } from "react";
import "../styles/CustomerForm.css"; 
import { Button } from "@mui/material";
import { AddCustomerService } from "../services/CustomerService"; 
import { useNavigate } from "react-router-dom";

const CustomerForm = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    companyname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    gst: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };
  const navigate = useNavigate();
  const addCustomer = async () => {
    try {
      const response = await AddCustomerService(customerData); 
      if (response.status === 201) {
        navigate("/customers");
      }
      setCustomerData({
        name: "",
        companyname: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        gst: "",
      }); 
    } catch (error) {
      alert("Failed to add customer. Please try again.");
    }
  };

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
            name="name"
            placeholder="Enter Customer Name"
            value={customerData.name}
            onChange={handleChange}
          />
        </div>
        <div className="customer-form-container">
          <h3 className="h3-style-label">COMPANY NAME</h3>
          <input
            className="styled-input"
            type="text"
            name="companyname"
            placeholder="Enter Company Name"
            value={customerData.companyname}
            onChange={handleChange}
          />
        </div>
        <div className="customer-form-container">
          <h3 className="h3-style-label">CONTACT</h3>
          <input
            className="styled-input"
            type="text"
            name="phone"
            placeholder="Enter Contact Number"
            value={customerData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="customer-form-container">
          <h3 className="h3-style-label">EMAIL</h3>
          <input
            className="styled-input"
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={customerData.email}
            onChange={handleChange}
          />
        </div>
        <div className="customer-form-container">
          <h3 className="h3-style-label">ADDRESS</h3>
          <input
            className="styled-input"
            type="text"
            name="address"
            placeholder="Enter Address"
            value={customerData.address}
            onChange={handleChange}
          />
        </div>
        <div className="customer-form-container">
          <h3 className="h3-style-label">CITY</h3>
          <input
            className="styled-input"
            type="text"
            name="city"
            placeholder="Enter City"
            value={customerData.city}
            onChange={handleChange}
          />
        </div>
        <div className="customer-form-container">
          <h3 className="h3-style-label">ZIP CODE</h3>
          <input
            className="styled-input"
            type="text"
            name="zip"
            placeholder="Enter Zip Code"
            value={customerData.zip}
            onChange={handleChange}
          />
        </div>
        <div className="customer-form-container">
          <h3 className="h3-style-label">GSTIN</h3>
          <input
            className="styled-input"
            type="text"
            name="gst"
            placeholder="Enter GSTIN"
            value={customerData.gst}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={addCustomer}>
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default CustomerForm;
