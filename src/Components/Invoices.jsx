import React, { useState, useEffect } from "react";
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
import { getService } from "../services/apiservice";
import "../styles/Invoices.css";

const Invoices = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getService("/invoices");
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };
  return (
    <div>
      <h2>Invoices</h2>
      <div className="invoice-btn-wrapper">
        <Button
          variant="contained"
          color="primary"
          style={{ fontSize: "0.8rem", padding: "5px 10px" }}
          onClick={() => navigate("/newinvoice")}>
          Add Invoice
        </Button>
      </div>
      {invoices.length === 0 ? (
        <div className="invoice-err-msg">
          <h3>No Invoices Found</h3>
          <p>Click on the button above to add an invoice.</p>
          <p>Or check your internet connection.</p>
        </div>
      ) : isMobile ? (
        <div style={{ padding: "10px" }}>
          {invoices.map((invoice) => (
            <div key={invoice._id} className="invoice-mbl-wrapper">
              <div className="invoice-mbl-header">
                <p className="invoice-mbl-general">{invoice.customerName}</p>
                <p className="invoice-mbl-totalamt">{invoice.totalAmount}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}>
                <p className="invoice-mbl-general">{invoice.invoiceDate}</p>
                <p style={{ margin: "5px 10px", color: "#1e3a8a" }}>
                  {invoice.invoiceNumber}
                </p>
              </div>
              <p className="invoice-mbl-general">
                Status:
                <span
                  className={`status-label ${
                    invoice.paymentStatus === "Paid" ? "paid" : "unpaid"
                  }`}>
                  {invoice.paymentStatus}
                </span>
              </p>
              <Button
                variant="contained"
                color="primary"
                style={{
                  fontSize: "0.8rem",
                  padding: "5px 10px",
                  marginTop: "10px",
                }}>
                View Details
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice Number</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice._id}>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{formatDate(invoice.invoiceDate)}</TableCell>
                  <TableCell>{invoice?.customer?.name}</TableCell>
                  <TableCell>{invoice.totalAmount}</TableCell>
                  <TableCell
                    className={`status-label ${
                      invoice.paymentStatus === "Paid" ? "paid" : "unpaid"
                    }`}>
                    {invoice.paymentStatus}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Invoices;
