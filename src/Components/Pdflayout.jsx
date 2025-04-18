import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";

const Pdflayout = ({
  sellerInfo,
  buyerInfo,
  invoiceMeta,
  lineItems,
  closePreview,
}) => {
  const totalTaxable = lineItems.reduce(
    (sum, item) =>
      sum + (parseFloat(item.quantity) * parseFloat(item.price) || 0),
    0
  );

  const gstType = invoiceMeta.gstType;
  const gstSummary = lineItems.map((item) => {
    const qty = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.price) || 0;
    const gstRate = parseFloat(item.gstRate) || 0;
    const taxable = qty * price;
    const gstAmount = (taxable * gstRate) / 100;
    return {
      hsn: item.hsn,
      taxable: taxable,
      gstRate: gstRate,
      cgst: gstType === "State" ? gstAmount / 2 : 0,
      sgst: gstType === "State" ? gstAmount / 2 : 0,
      igst: gstType === "Central" ? gstAmount : 0,
    };
  });

  const totalAmount = lineItems.reduce(
    (sum, item) => sum + parseFloat(item.total || 0),
    0
  );

  const amountInWords = (num) => {
    // Simplified version, can use num-to-words package
    return `Rupees ${Math.round(num)} only`;
  };

  return (
    <Box p={4} fontFamily="Arial">
      <Typography variant="h6" align="center">
        Tax Invoice
      </Typography>
      <Button
        id="download-button"
        className="download-button"
        onClick={() => {
          document.getElementById("download-button").style.display = "none";
          window.print();
        }}>
        DOWNLOAD
      </Button>
      {/* Seller and Invoice Meta */}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Box>
          <Typography fontWeight="bold">{sellerInfo.name}</Typography>
          <Typography>{sellerInfo.address}</Typography>
          <Typography>Phone: {sellerInfo.phone}</Typography>
          <Typography>Email: {sellerInfo.email}</Typography>
          <Typography>GSTIN: {sellerInfo.gstin}</Typography>
          <Typography>State: {sellerInfo.state}</Typography>
        </Box>
        <Box>
          <Typography>Invoice No: {invoiceMeta.invoiceNo}</Typography>
          <Typography>Date: {invoiceMeta.invoiceDate}</Typography>
          <Typography>Place of supply: {invoiceMeta.placeOfSupply}</Typography>
        </Box>
      </Box>

      {/* Buyer Info */}
      <Box mt={3}>
        <Typography fontWeight="bold">Bill To</Typography>
        <Typography>{buyerInfo.name}</Typography>
        <Typography>{buyerInfo.address}</Typography>
        <Typography>Contact: {buyerInfo.contact}</Typography>
        <Typography>GSTIN: {buyerInfo.gstin}</Typography>
        <Typography>State: {buyerInfo.state}</Typography>
      </Box>

      {/* Items Table */}
      <Box mt={3}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>SL</th>
              <th>ITEM</th>
              <th>HSN</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Taxable</th>
              <th>GST</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, idx) => {
              const qty = parseFloat(item.quantity) || 0;
              const price = parseFloat(item.price) || 0;
              const taxable = qty * price;
              const gstRate = parseFloat(item.gstRate) || 0;
              const gstAmount = (taxable * gstRate) / 100;
              return (
                <tr
                  key={idx}
                  style={{ textAlign: "center", borderTop: "1px solid #ccc" }}>
                  <td>{idx + 1}</td>
                  <td>{item.description}</td>
                  <td>{item.hsn}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>₹ {price.toFixed(2)}</td>
                  <td>₹ {taxable.toFixed(2)}</td>
                  <td>
                    ₹ {gstAmount.toFixed(2)} ({gstRate}%)
                  </td>
                  <td>₹ {item.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>

      {/* Totals */}
      <Box mt={3}>
        <Typography fontWeight="bold">Invoice Amount In Words:</Typography>
        <Typography>{amountInWords(totalAmount)}</Typography>

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Box textAlign="right">
            <Typography>Sub Total: ₹ {totalTaxable.toFixed(2)}</Typography>
            <Typography fontWeight="bold">
              Total: ₹ {totalAmount.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* GST Summary Table */}
      <Box mt={3}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}>
          <thead>
            <tr>
              <th>HSN</th>
              <th>Taxable</th>
              {gstType === "State" ? (
                <>
                  <th>CGST</th>
                  <th>SGST</th>
                </>
              ) : (
                <th>IGST</th>
              )}
              <th>Total GST</th>
            </tr>
          </thead>
          <tbody>
            {gstSummary.map((item, idx) => (
              <tr key={idx}>
                <td>{item.hsn}</td>
                <td>₹ {item.taxable.toFixed(2)}</td>
                {gstType === "State" ? (
                  <>
                    <td>₹ {item.cgst.toFixed(2)}</td>
                    <td>₹ {item.sgst.toFixed(2)}</td>
                  </>
                ) : (
                  <td>₹ {item.igst.toFixed(2)}</td>
                )}
                <td>₹ {(item.cgst + item.sgst + item.igst).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {/* Terms and Signature */}
      <Box mt={5}>
        <Typography fontWeight="bold">Terms and Conditions:</Typography>
        <Typography>Thanks for doing business with us!</Typography>

        <Box mt={4} textAlign="right">
          <Typography>For: {sellerInfo.name}</Typography>
          <Typography mt={2}>Authorised Signature</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Pdflayout;
