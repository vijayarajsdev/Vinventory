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
import "../styles/Invoices.css";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px )");
  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      date: "08-04-2025",
      customerName: "Arun Kumar",
      totalAmount: "Rs.150.00",
      status: "Paid",
    },
    {
      id: "INV-002",
      date: "08-04-2025",
      customerName: "Lakshmi Narayanan",
      totalAmount: "Rs.200.00",
      status: "Unpaid",
    },
    {
      id: "INV-003",
      date: "09-04-2025",
      customerName: "Rajesh Reddy",
      totalAmount: "Rs.320.00",
      status: "Paid",
    },
    {
      id: "INV-004",
      date: "09-04-2025",
      customerName: "Janani",
      totalAmount: "Rs.100.00",
      status: "Unpaid",
    },
    {
      id: "INV-005",
      date: "09-04-2025",
      customerName: "Ananya",
      totalAmount: "Rs.450.00",
      status: "Paid",
    },
    {
      id: "INV-006",
      date: "09-04-2025",
      customerName: "Ravi Teja",
      totalAmount: "Rs.310.00",
      status: "Paid",
    },
    {
      id: "INV-007",
      date: "09-04-2025",
      customerName: "Divya",
      totalAmount: "Rs.180.00",
      status: "Unpaid",
    },
    {
      id: "INV-008",
      date: "10-04-2025",
      customerName: "Vikram",
      totalAmount: "Rs.600.00",
      status: "Paid",
    },
    {
      id: "INV-009",
      date: "10-04-2025",
      customerName: "Meena",
      totalAmount: "Rs.225.00",
      status: "Unpaid",
    },
    {
      id: "INV-010",
      date: "10-04-2025",
      customerName: "Harsha",
      totalAmount: "Rs.90.00",
      status: "Paid",
    },
    {
      id: "INV-011",
      date: "10-04-2025",
      customerName: "Prithvi",
      totalAmount: "Rs.750.00",
      status: "Unpaid",
    },
    {
      id: "INV-012",
      date: "10-04-2025",
      customerName: "Aishwarya",
      totalAmount: "Rs.410.00",
      status: "Paid",
    },
    {
      id: "INV-013",
      date: "11-04-2025",
      customerName: "Sundar",
      totalAmount: "Rs.505.00",
      status: "Unpaid",
    },
    {
      id: "INV-014",
      date: "11-04-2025",
      customerName: "Swathi",
      totalAmount: "Rs.360.00",
      status: "Paid",
    },
    {
      id: "INV-015",
      date: "11-04-2025",
      customerName: "Karthik",
      totalAmount: "Rs.220.00",
      status: "Unpaid",
    },
    {
      id: "INV-016",
      date: "11-04-2025",
      customerName: "Bhavana",
      totalAmount: "Rs.500.00",
      status: "Paid",
    },
    {
      id: "INV-017",
      date: "11-04-2025",
      customerName: "Naveen",
      totalAmount: "Rs.190.00",
      status: "Unpaid",
    },
    {
      id: "INV-018",
      date: "12-04-2025",
      customerName: "Pooja",
      totalAmount: "Rs.330.00",
      status: "Paid",
    },
    {
      id: "INV-019",
      date: "12-04-2025",
      customerName: "Srinivas",
      totalAmount: "Rs.700.00",
      status: "Paid",
    },
    {
      id: "INV-020",
      date: "12-04-2025",
      customerName: "Charan",
      totalAmount: "Rs.400.00",
      status: "Unpaid",
    },
    {
      id: "INV-021",
      date: "12-04-2025",
      customerName: "Rekha",
      totalAmount: "Rs.120.00",
      status: "Paid",
    },
    {
      id: "INV-022",
      date: "12-04-2025",
      customerName: "Ashwin",
      totalAmount: "Rs.660.00",
      status: "Paid",
    },
    {
      id: "INV-023",
      date: "13-04-2025",
      customerName: "Deepa",
      totalAmount: "Rs.250.00",
      status: "Unpaid",
    },
    {
      id: "INV-024",
      date: "13-04-2025",
      customerName: "Surya",
      totalAmount: "Rs.870.00",
      status: "Paid",
    },
    {
      id: "INV-025",
      date: "13-04-2025",
      customerName: "Vidya",
      totalAmount: "Rs.310.00",
      status: "Unpaid",
    },
    {
      id: "INV-026",
      date: "13-04-2025",
      customerName: "Yash",
      totalAmount: "Rs.980.00",
      status: "Paid",
    },
    {
      id: "INV-027",
      date: "14-04-2025",
      customerName: "Priya",
      totalAmount: "Rs.270.00",
      status: "Unpaid",
    },
    {
      id: "INV-028",
      date: "14-04-2025",
      customerName: "Dhanush",
      totalAmount: "Rs.430.00",
      status: "Paid",
    },
    {
      id: "INV-029",
      date: "14-04-2025",
      customerName: "Manju",
      totalAmount: "Rs.100.00",
      status: "Paid",
    },
    {
      id: "INV-030",
      date: "14-04-2025",
      customerName: "Chandni",
      totalAmount: "Rs.390.00",
      status: "Unpaid",
    },
    {
      id: "INV-031",
      date: "15-04-2025",
      customerName: "Akshay",
      totalAmount: "Rs.560.00",
      status: "Paid",
    }, // North Indian
    {
      id: "INV-032",
      date: "15-04-2025",
      customerName: "Nikita",
      totalAmount: "Rs.650.00",
      status: "Unpaid",
    }, // North Indian
    {
      id: "INV-033",
      date: "15-04-2025",
      customerName: "Saurabh",
      totalAmount: "Rs.790.00",
      status: "Paid",
    }, // North Indian
    {
      id: "INV-034",
      date: "15-04-2025",
      customerName: "Sneha",
      totalAmount: "Rs.340.00",
      status: "Unpaid",
    },
    {
      id: "INV-035",
      date: "15-04-2025",
      customerName: "Arvind",
      totalAmount: "Rs.120.00",
      status: "Paid",
    },
    {
      id: "INV-036",
      date: "16-04-2025",
      customerName: "Neha",
      totalAmount: "Rs.480.00",
      status: "Paid",
    }, // North Indian
    {
      id: "INV-037",
      date: "16-04-2025",
      customerName: "Rohit",
      totalAmount: "Rs.290.00",
      status: "Unpaid",
    }, // North Indian
    {
      id: "INV-038",
      date: "16-04-2025",
      customerName: "Varun",
      totalAmount: "Rs.390.00",
      status: "Paid",
    },
    {
      id: "INV-039",
      date: "16-04-2025",
      customerName: "Krishna",
      totalAmount: "Rs.620.00",
      status: "Unpaid",
    },
    {
      id: "INV-040",
      date: "17-04-2025",
      customerName: "Bhargavi",
      totalAmount: "Rs.710.00",
      status: "Paid",
    },
    {
      id: "INV-041",
      date: "17-04-2025",
      customerName: "Tejas",
      totalAmount: "Rs.240.00",
      status: "Unpaid",
    },
    {
      id: "INV-042",
      date: "17-04-2025",
      customerName: "Kiran",
      totalAmount: "Rs.110.00",
      status: "Paid",
    },
    {
      id: "INV-043",
      date: "17-04-2025",
      customerName: "Ritika",
      totalAmount: "Rs.150.00",
      status: "Paid",
    }, // North Indian
    {
      id: "INV-044",
      date: "18-04-2025",
      customerName: "Sathish",
      totalAmount: "Rs.780.00",
      status: "Unpaid",
    },
    {
      id: "INV-045",
      date: "18-04-2025",
      customerName: "Lavanya",
      totalAmount: "Rs.310.00",
      status: "Paid",
    },
    {
      id: "INV-046",
      date: "18-04-2025",
      customerName: "Revanth",
      totalAmount: "Rs.400.00",
      status: "Paid",
    },
    {
      id: "INV-047",
      date: "18-04-2025",
      customerName: "Snehal",
      totalAmount: "Rs.275.00",
      status: "Unpaid",
    }, // North Indian
    {
      id: "INV-048",
      date: "19-04-2025",
      customerName: "Nithya",
      totalAmount: "Rs.190.00",
      status: "Paid",
    },
    {
      id: "INV-049",
      date: "19-04-2025",
      customerName: "Ajay",
      totalAmount: "Rs.210.00",
      status: "Unpaid",
    },
    {
      id: "INV-050",
      date: "19-04-2025",
      customerName: "Reshma",
      totalAmount: "Rs.530.00",
      status: "Paid",
    },
  ]);

  return (
    <div>
      <h2>Invoices</h2>
      <div className="invoice-btn-wrapper">
        <Button
          variant="contained"
          color="primary"
          style={{
            fontSize: "0.8rem",
            padding: "5px 10px",
          }}
          onClick={() => navigate("/newinvoice")}>
          {" "}
          Add Invoice{" "}
        </Button>
      </div>
      {invoices?.length === 0 ? (
        <div className="invoice-err-msg">
          <h3>No Invoices Found</h3>
          <p>Click on the button above to add an invoice.</p>
          <p>Or check your internet connection.</p>
        </div>
      ) : isMobile ? (
        <div style={{ padding: "10px" }}>
          {invoices.map((invoice) => (
            <div key={invoice.id} className="invoice-mbl-wrapper">
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
                <p className="invoice-mbl-general">{invoice.date}</p>
                <p style={{ margin: "5px 10px ", color: "#1e3a8a" }}>
                  {invoice.id}
                </p>
              </div>

              <p className="invoice-mbl-general">
                Status:
                <span
                  className={`status-label ${
                    invoice.status === "Paid" ? "paid" : "unpaid"
                  }`}>
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
                    className={`status-label ${
                      invoice.status === "Paid" ? "paid" : "unpaid"
                    }`}>
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
