import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import Pdflayout from "./Pdflayout";
import "../styles/NewInvoiceLayout.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
const NewinvoiceLayout = () => {
  const [showPreview, setShowPreview] = useState(false);
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

  const [sellerInfo, setSellerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    gstin: "",
    state: "",
  });
  const invoicedummy = {
    seller: {
      name: "SVN METALS",
      address: "Chennai, Tamil Nadu",
      gstin: "33XXXXXXXZ1Z5",
      email: "svmetals@email.com",
      phone: "1234567809",
    },
    buyer: {
      name: "Client Name",
      address: "Coimbatore, TN",
      gstin: "33YYYYYYYX1Z2",
    },
    invoiceNumber: "25-26/000001",
    date: "02/04/2025",
    dueDate: "17/04/2025",
    terms: "Net 15",
    placeOfSupply: "Tamil Nadu (33)",
    items: lineItems,
    // items:
    //  [
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    //   {
    //     name: "HYDRAULIC HOSE WITH END FITTINGS",
    //     hsn: "40091200",
    //     quantity: 2,
    //     rate: 3150,
    //     amount: 6300,
    //     cgst: 567,
    //     sgst: 567,
    //     total: 7434,
    //   },
    // ],
    cgst: 567,
    sgst: 567,
    total: 7434,
    totalInWords: "Indian Rupees Seven Thousand Four Hundred Thirty-Four Only",
    bankDetails: {
      accountName: "SVN METALS",
      bankName: "SBI",
      branch: "Chennai Branch",
      accountNumber: "XXXXXXX123",
      ifsc: "SBIN0000123",
    },
    notes: "Thanks for your business.",
    isPaid: true,
  };
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

  const handleAddItem = () => {
    if (lineItems.length <= 10) {
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
    } else {
      alert(
        "Sorry,You can add only 20 items.Save and create new invoice for remaining items"
      );
    }
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
        <h3>Buyer Information</h3>
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
        <h3>Invoice Details</h3>
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

      <h3>Products / Services</h3>
      <table className="items-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>HSN</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Price</th>
            <th>GST%</th>
            {invoiceMeta.gstType === "State" ? (
              <>
                <th>CGST</th>
                <th>SGST</th>
              </>
            ) : (
              <th>IGST</th>
            )}
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  className="input-field"
                />
              </td>
              <td className="hsn-field">
                <input
                  placeholder="HSN"
                  value={item.hsn}
                  onChange={(e) =>
                    handleItemChange(index, "hsn", e.target.value)
                  }
                  className="input-field"
                />
              </td>
              <td className="quantity-field">
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  className="input-field"
                />
              </td>
              <td className="unit-field">
                <input
                  value={item.unit}
                  onChange={(e) =>
                    handleItemChange(index, "unit", e.target.value)
                  }
                  className="input-field"
                />
              </td>
              <td className="price-field">
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                  className="input-field"
                />
              </td>
              <td className="rate-field">
                <select
                  value={item.gstRate}
                  onChange={(e) =>
                    handleItemChange(index, "gstRate", e.target.value)
                  }
                  className="select-field">
                  <option value="">GST%</option>
                  <option value="0">0%</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </td>
              {invoiceMeta.gstType === "State" ? (
                <>
                  <td className="rate-field">
                    <input value={item.cgst} readOnly className="input-field" />
                  </td>
                  <td className="rate-field">
                    <input value={item.sgst} readOnly className="input-field" />
                  </td>
                </>
              ) : (
                <td className="rate-field">
                  <input value={item.igst} readOnly className="input-field" />
                </td>
              )}
              <td className="total-field">
                <input value={item.total} readOnly className="input-field" />
              </td>
              <td className="action-field">
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="remove-btn">
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
          <Pdflayout data={invoicedummy} />
        </Box>
      </Modal>
    </div>
  );
};

export default NewinvoiceLayout;
