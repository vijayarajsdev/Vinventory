import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import Pdflayout from "./Pdflayout";
import "../styles/NewInvoiceLayout.css";
const NewinvoiceLayout = () => {
  const [showPreview, setShowPreview] = useState(false);

  const [sellerInfo, setSellerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    gstin: "",
    state: "",
  });

  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    address: "",
    contact: "",
    gstin: "",
    state: "",
  });

  const [invoiceMeta, setInvoiceMeta] = useState({
    invoiceNo: "",
    invoiceDate: "",
    placeOfSupply: "",
    gstType: "State", // or "Central"
  });

  const [lineItems, setLineItems] = useState([
    {
      description: "",
      hsn: "",
      quantity: "",
      unit: "Pcs",
      price: "",
      gstRate: "",
      cgst: "",
      sgst: "",
      igst: "",
      total: "",
    },
  ]);

  const handleAddItem = () => {
    setLineItems([
      ...lineItems,
      {
        description: "",
        hsn: "",
        quantity: "",
        unit: "Pcs",
        price: "",
        gstRate: "",
        total: "",
      },
    ]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...lineItems];
    updatedItems[index][field] = value;

    if (["quantity", "price", "gstRate"].includes(field)) {
      const qty = parseFloat(updatedItems[index].quantity) || 0;
      const price = parseFloat(updatedItems[index].price) || 0;
      const gstRate = parseFloat(updatedItems[index].gstRate) || 0;
      const taxable = qty * price;
      const gstAmount = (taxable * gstRate) / 100;
      updatedItems[index].total = (taxable + gstAmount).toFixed(2);
      if (invoiceMeta.gstType === "State") {
        updatedItems[index].sgst = (gstAmount / 2).toFixed(2);
        updatedItems[index].cgst = (gstAmount / 2).toFixed(2);
      } else if (invoiceMeta.gstType === "Central") {
        updatedItems[index].igst = gstAmount.toFixed(2);
      }
    }

    setLineItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...lineItems];
    updatedItems.splice(index, 1);
    setLineItems(updatedItems);
  };

  return (
    <div className="newinvoice-layout">
      <div className="sticky-header">
        <h2>New Invoice</h2>
      </div>
      {/* Buyer Info */}
      <div className="buyer-info">
        <h2>Buyer Information</h2>
        <div className="buyer-info-grid">
          {["name", "address", "contact", "gstin", "state"].map((field) => (
            <input
              className={"input-field"}
              key={field}
              placeholder={field.toUpperCase()}
              value={buyerInfo[field]}
              onChange={(e) =>
                setBuyerInfo({ ...buyerInfo, [field]: e.target.value })
              }
            />
          ))}
        </div>
      </div>

      {/* Invoice Meta */}
      <div className="invoice-info">
        <h2>Invoice Details</h2>
        <div className="invoice-info-grid">
          <input
            placeholder="Invoice Number"
            value={invoiceMeta.invoiceNo}
            onChange={(e) =>
              setInvoiceMeta({ ...invoiceMeta, invoiceNo: e.target.value })
            }
            className="input-field "
          />
          <input
            type="date"
            value={invoiceMeta.invoiceDate}
            onChange={(e) =>
              setInvoiceMeta({ ...invoiceMeta, invoiceDate: e.target.value })
            }
            className="input-field "
          />
          <input
            placeholder="Place of Supply"
            value={invoiceMeta.placeOfSupply}
            onChange={(e) =>
              setInvoiceMeta({ ...invoiceMeta, placeOfSupply: e.target.value })
            }
            className="input-field"
          />
          <select
            value={invoiceMeta.gstType}
            onChange={(e) =>
              setInvoiceMeta({ ...invoiceMeta, gstType: e.target.value })
            }
            className="select-field">
            <option value="State">State (CGST + SGST)</option>
            <option value="Central">Central (IGST)</option>
          </select>
        </div>
      </div>

      {/* Items Table */}
      <h3>Products / Services</h3>
      <div className="items-header">
        <span>Description</span>
        <span>HSN</span>
        <span>Qty</span>
        <span>Unit</span>
        <span>Price</span>
        <span>GST %</span>
        {invoiceMeta.gstType === "State" ? (
          <>
            <span>CGST</span>
            <span>SGST</span>
          </>
        ) : (
          <>
            <span>IGST</span>
            <span></span>
          </>
        )}
        <span>Total</span>
        <span></span>
      </div>

      {lineItems.map((item, index) => (
        <div key={index} className="items-row">
          <input
            placeholder="Description"
            value={item.description}
            onChange={(e) =>
              handleItemChange(index, "description", e.target.value)
            }
            className="input-field description"
          />
          <input
            placeholder="HSN"
            value={item.hsn}
            onChange={(e) => handleItemChange(index, "hsn", e.target.value)}
            className="input-field hsn"
          />
          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) =>
              handleItemChange(index, "quantity", e.target.value)
            }
            className="input-field qty"
          />
          <input
            value={item.unit}
            onChange={(e) => handleItemChange(index, "unit", e.target.value)}
            className="input-field unit"
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(index, "price", e.target.value)}
            className="input-field price"
          />
          <select
            value={item.gstRate}
            onChange={(e) => handleItemChange(index, "gstRate", e.target.value)}
            className="select-field rate">
            <option value="">GST%</option>
            <option value="0">0%</option>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>
          {invoiceMeta.gstType === "State" ? (
            <>
              {" "}
              <input value={item.cgst} readOnly className="input-field rate" />
              <input value={item.sgst} readOnly className="input-field rate" />
            </>
          ) : (
            <input value={item.igst} readOnly className="input-field igst" />
          )}
          <input value={item.total} readOnly className="input-field total" />
          <button
            onClick={() => handleRemoveItem(index)}
            className="remove-btn">
            ❌
          </button>
        </div>
      ))}

      <div className="actions">
        <button onClick={handleAddItem} className="action-btn">
          Add Item
        </button>
        <button onClick={() => setShowPreview(true)} className="action-btn">
          👁️ Preview Invoice
        </button>
      </div>

      {/* Preview Modal */}
      <Modal open={showPreview} onClose={() => setShowPreview(false)}>
        <Box className="modal-box">
          <Pdflayout
            sellerInfo={sellerInfo}
            buyerInfo={buyerInfo}
            invoiceMeta={invoiceMeta}
            lineItems={lineItems}
            closePreview={() => setShowPreview(false)}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default NewinvoiceLayout;
