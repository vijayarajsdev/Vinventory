import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import Pdflayout from "./Pdflayout";
import "../styles/NewInvoiceLayout.css";
import { getService, postService } from "../services/apiservice"; // Import postService for POST requests

const NewinvoiceLayout = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [lineItems, setLineItems] = useState([
    {
      productId: "",
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
  const [customers, setCustomers] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [buyerInfo, setBuyerInfo] = useState({
    customerId: "",
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

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getService("/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const fetchInventoryItems = async () => {
      try {
        const response = await getService("/inventory");
        setInventoryItems(response.data);
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };
    const lastInvoiceNumber = async () => {
      try {
        const response = await getService("/invoices/lastInvoiceNumber");
        setInvoiceMeta((prev) => ({
          ...prev,
          invoiceNo: response.data.invoiceNumber + 1,
        }));
      } catch (error) {
        console.error("Error fetching last invoice number:", error);
      }
    };

    fetchCustomers();
    fetchInventoryItems();
    lastInvoiceNumber();
  }, []);

  const handleAddItem = () => {
    setLineItems([
      ...lineItems,
      {
        productId: "",
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

    if (field === "productId") {
      const selectedProduct = inventoryItems.find((item) => item._id === value);
      if (selectedProduct) {
        updatedItems[index].description = selectedProduct.name;
        updatedItems[index].price = selectedProduct.price;
        updatedItems[index].hsn = selectedProduct.hsn || "";
      }
    }

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

  const handleSaveInvoice = async () => {
    const invoiceData = {
      customerId: buyerInfo.customerId,
      invoiceNumber: invoiceMeta.invoiceNo,
      invoiceDate: invoiceMeta.invoiceDate,
      paymentStatus: "Pending",
      placeOfSupply: invoiceMeta.placeOfSupply,
      gstType: invoiceMeta.gstType,
      products: lineItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await postService("/invoices/create", invoiceData);
      alert("Invoice saved successfully!");
      console.log("Saved Invoice:", response.data);
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Failed to save the invoice. Please try again.");
    }
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
          <select
            className="input-field"
            value={buyerInfo.customerId}
            onChange={(e) => {
              const selectedCustomer = customers.find(
                (customer) => customer._id === e.target.value
              );
              setBuyerInfo({
                customerId: e.target.value,
                name: selectedCustomer?.name || "",
                address: selectedCustomer?.address || "",
                contact: selectedCustomer?.phone || "",
                gstin: selectedCustomer?.gst || "",
                state: selectedCustomer?.state || "",
              });
            }}>
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
          </select>
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
            className="input-field"
          />
          <input
            type="date"
            value={invoiceMeta.invoiceDate}
            onChange={(e) =>
              setInvoiceMeta({ ...invoiceMeta, invoiceDate: e.target.value })
            }
            className="input-field"
          />
          <input
            placeholder="Place of Supply"
            value={invoiceMeta.placeOfSupply}
            onChange={(e) =>
              setInvoiceMeta({
                ...invoiceMeta,
                placeOfSupply: e.target.value,
              })
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
            <th>Product</th>
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
              <td className="product-field">
                <select
                  value={item.productId}
                  onChange={(e) =>
                    handleItemChange(index, "productId", e.target.value)
                  }
                  className="select-field">
                  <option value="">Select Product</option>
                  {inventoryItems.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="description-field">
                <input
                  placeholder="Description"
                  value={item.description}
                  readOnly
                  className="input-field"
                />
              </td>
              <td className="hsn-field">
                <input
                  placeholder="HSN"
                  value={item.hsn}
                  readOnly
                  className="input-field"
                />
              </td>
              <td className="quantity-field">
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  min='1'
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
                  readOnly
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
        <button onClick={handleSaveInvoice} className="action-btn">
          💾 Save Invoice
        </button>
      </div>

      {/* Preview Modal */}
      <Modal open={showPreview} onClose={() => setShowPreview(false)}>
        <Box className="modal-box">
          <Pdflayout data={{ buyerInfo, lineItems, invoiceMeta }} />
        </Box>
      </Modal>
    </div>
  );
};

export default NewinvoiceLayout;
