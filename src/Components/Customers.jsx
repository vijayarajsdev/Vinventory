import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/Invoices.css";
import { CustomerService } from "../services/CustomerService";

const Customers = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [customers, setCustomers] = useState([
    {
      id: "CUST-001",
      name: "Arun Kumar",
      contact: "9876543210",
      email: "arun@example.com",
      address: "Chennai, India",
    },
    {
      id: "CUST-002",
      name: "Lakshmi Narayanan",
      contact: "9876543211",
      email: "lakshmi@example.com",
      address: "Bangalore, India",
    },
    {
      id: "CUST-003",
      name: "Rajesh Reddy",
      contact: "9876543212",
      email: "rajesh@example.com",
      address: "Hyderabad, India",
    },
  ]);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerdata = await CustomerService();
        setCustomers(customerdata.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    fetchCustomers();
  }, []);
  return (
    <div>
      <h2>Customers</h2>
      <div className="invoice-btn-wrapper">
        <Button
          variant="contained"
          color="primary"
          style={{
            fontSize: "0.8rem",
            padding: "5px 10px",
          }}
          onClick={() => navigate("/newcustomer")}>
          Add Customer
        </Button>
      </div>
      {customers?.length === 0 ? (
        <div className="invoice-err-msg">
          <h3>No Customers Found</h3>
          <p>Click on the button above to add a customer.</p>
        </div>
      ) : isMobile ? (
        <div style={{ padding: "10px" }}>
          {customers.map((customer) => (
            <div key={customer.id} className="invoice-mbl-wrapper">
              <div className="invoice-mbl-header">
                <p className="invoice-mbl-general">{customer.name}</p>
                <p className="invoice-mbl-general">{customer.contact}</p>
              </div>
              <p className="invoice-mbl-general">{customer.email}</p>
              <p className="invoice-mbl-general">{customer.address}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.customerId}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Customers;
