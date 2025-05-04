import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Button } from "@mui/material";
import logo from "../assets/base_icon_white_background.png";
// Optional font
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf" },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 10,
    padding: 20,
    lineHeight: 1.5,
    color: "#000",
    border: "1px solid #000",
    margin: 0,
    height: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
});

const PdfLayout = ({ data }) => {
  const {
    seller,
    buyer,
    invoiceNumber,
    date,
    dueDate,
    placeOfSupply,
    terms,
    items,
    cgst,
    sgst,
    total,
    totalInWords,
    bankDetails,
    notes,
    isPaid,
  } = data;
  const [isActive,setIsActive]=useState(true);
  const downloadinvoice = () => {
    setIsActive(false);
    window.print();
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button className={isActive?"":"download-button"} onClick={downloadinvoice}>
          Download
        </Button>
      </div>

      <div>
        <div style={styles.page}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "10% 50% 40%",
              alignItems: "start",
            }}>
            <div>
              <img src={logo} style={{ width: "100px", height: "100px" }} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: 50,
              }}>
              <p style={{ fontWeight: "bold" }}>{data?.seller?.name}</p>
              <p>{data?.seller?.address}</p>
              <p>{data?.seller?.gstin}</p>
              <p>{data?.seller?.phone}</p>
              <p>{data?.seller?.email}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",
              }}>
              <p>TAX INVOICE</p>
              <p>Invoice-001</p>
            </div>
          </div>
          <div
            style={{
              borderBottom: "1px solid black", // Horizontal line
              width: "calc(100%-40px)", // Full width of the page
              margin: "0 auto", // Remove any margin
              padding: 0, // Remove any padding
            }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                <p>Invoice Date </p>
                <p>: {data?.date}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                <p>Terms </p>
                <p>: {data?.terms}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                <p>Due Date </p>
                <p>: {data?.dueDate}</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
              <p>Place of Supply </p>
              <p>: {data?.placeOfSupply}</p>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <p style={{ fontSize: 12, fontWeight: "bold" }}>Bill To:</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>{data?.buyer?.name}</p>
              <p>{data?.buyer?.address}</p>
              <p>{data?.buyer?.gstin}</p>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <p style={{ fontSize: 12, fontWeight: "bold" }}>Item Details:</p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5% 30% 10% 5% 10% 5% 5% 10% 10%",
              marginTop: 5,
            }}>
            <p style={{ fontWeight: "bold" }}>S.NO</p>
            <p style={{ fontWeight: "bold" }}>ITEM</p>
            <p style={{ fontWeight: "bold" }}>HSN/SAC</p>
            <p style={{ fontWeight: "bold" }}>Qty</p>
            <p style={{ fontWeight: "bold" }}>Rate</p>
            <p style={{ fontWeight: "bold" }}>Amt</p>
            <p style={{ fontWeight: "bold" }}>CGST</p>
            <p style={{ fontWeight: "bold" }}>SGST</p>
            <p style={{ fontWeight: "bold" }}>Amount</p>
          </div>
          {items.map((item, i) => (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "5% 30% 10% 5% 10% 5% 5% 10% 10%",
                  marginTop: 5,
                }}
                key={i}>
                <p>{i + 1}</p>
                <p>{item.description}</p>
                <p>{item.hsn}</p>
                <p>{item.quantity}</p>
                <p>₹{item.price}</p>
                <p>₹{item.price * item.quantity}</p>
                <p>₹{item.cgst}</p>
                <p>₹{item.sgst}</p>
                <p>₹{item.total}</p>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 50 }}>
            <p style={{ fontSize: 12, fontWeight: "bold" }}>Total in Words:</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>{data?.totalInWords}</p>
              <p style={{ fontSize: 12, fontWeight: "bold", marginTop: 10 }}>
                Bank Details:
              </p>
              <p>{data?.bankDetails?.accountName}</p>
              <p>{data?.bankDetails?.bankName}</p>
              <p>{data?.bankDetails?.branch}</p>
              <p>{data?.bankDetails?.accountNumber}</p>
              <p>{data?.bankDetails?.ifsc}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: 12, fontWeight: "bold" }}>
                Amount Summary:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                <p>Sub Total</p>
                <p>: ₹{total - cgst - sgst}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                <p>CGST (9%)</p>
                <p>: ₹{cgst}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                <p>SGST (9%)</p>
                <p>: ₹{sgst}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                <p>Total</p>
                <p>: ₹{total}</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <p style={{ fontSize: 12, fontWeight: "bold" }}>Notes:</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>{data?.notes}</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: 10,
            }}>
            <p style={{ fontSize: 12, fontWeight: "bold" }}>
              Authorized Signature:
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>{data?.signature}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfLayout;
