import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

const Invoices = () => {
  const isMobile = useMediaQuery("(max-width:600px )");
  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      date: "08-04-2025",
      customerName: "AKASH KUMAR",
      totalAmount: "Rs.100.00",
      status: "Paid",
    },
    {
      id: "INV-002",
      date: "08-04-2025",
      customerName: "Janani",
      totalAmount: "Rs.200.00",
      status: "Unpaid",
    },
  ]);
  return (
    <div>
      <h2>Invoices</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          padding: "10px",
        }}>
        <Button
          variant="contained"
          color="primary"
          style={{
            fontSize: isMobile ? "0.8rem" : "1rem",
            padding: isMobile ? "5px 10px" : "10px 20px",
          }}>
          {" "}
          Add Invoice{" "}
        </Button>
      </div>
      {invoices?.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}>
          <h3>No Invoices Found</h3>
          <p>Click on the button above to add an invoice.</p>
          <p>Or check your internet connection.</p>
        </div>
      ) : isMobile ? (
        <div style={{ padding: "10px" }}>
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              style={{
                margin: "10px",
                padding: "15px",
                border: "1px solid #d1e7ff", // Light blue border
                borderRadius: "8px", // Rounded corners
                backgroundColor: "aliceblue", // Card background
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <p style={{ margin: "5px 0", color: "#475569" }}>
                  {invoice.customerName}
                </p>
                <p
                  style={{
                    margin: "5px 0",
                    color: "#475569",
                    fontWeight: "bold",
                  }}>
                  {invoice.totalAmount}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}>
                <p style={{ margin: "5px  0px", color: "#475569" }}>
                  {invoice.date}
                </p>
                <p style={{ margin: "5px 10px ", color: "#1e3a8a" }}>
                  {invoice.id}
                </p>
              </div>

              <p style={{ margin: "5px 0", color: "#475569" }}>
                Status:
                <span
                  style={{
                    fontFamily: "manrope",
                    color: invoice.status === "Paid" ? "#16a34a" : "#dc2626",
                    fontWeight: "bold",
                  }}>
                  {" "}
                  {invoice.status}
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
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{invoice.totalAmount}</TableCell>
                  <TableCell
                    style={{
                      color: invoice.status === "Paid" ? "#16a34a" : "#dc2626", // Green for Paid, Red for Unpaid
                      fontWeight: "bold",
                    }}>
                    {invoice.status}
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
