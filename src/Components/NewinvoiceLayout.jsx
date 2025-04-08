import React, { useState } from "react";

const NewinvoiceLayout = () => {
  const [lineItems, setLineItems] = useState([
    {
      productName: "",
      quantity: "",
      price: "",
      gstRate: "",
      total: "",
    },
  ]);

  const handleAddItem = () => {
    setLineItems([
      ...lineItems,
      {
        productName: "",
        quantity: "",
        price: "",
        gstRate: "",
        total: "",
      },
    ]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...lineItems];
    updatedItems[index][field] = value;

    // Optional: Auto-calculate total
    if (field === "quantity" || field === "price" || field === "gstRate") {
      const quantity = parseFloat(updatedItems[index].quantity) || 0;
      const price = parseFloat(updatedItems[index].price) || 0;
      const gstRate = parseFloat(updatedItems[index].gstRate) || 0;
      const baseTotal = quantity * price;
      const gstAmount = (baseTotal * gstRate) / 100;
      updatedItems[index].total = (baseTotal + gstAmount).toFixed(2);
    }

    setLineItems(updatedItems);
  };
  const handleRemoveItem = (index) => {
    const updatedItems = [...lineItems];
    updatedItems.splice(index, 1);
    setLineItems(updatedItems);
  };

  return (
    <div>
      <h2>New Invoice</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "20vw 1fr",
            padding: "5px 2rem",
          }}>
          <h4>Customer</h4>
          <input
            type="text"
            placeholder="Customer Name"
            style={{ width: "40%", height: "2rem", margin: "0px 2rem" }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "20vw 30%",
            padding: "5px 2rem",
          }}>
          <h4>Invoice No</h4>
          <input
            type="text"
            placeholder="Invoice No"
            style={{
              width: "40%",
              height: "2rem",
              margin: "0px 2rem",
            }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "20vw 30%",
            padding: "5px 2rem",
          }}>
          <h4>Invoice Date</h4>
          <input
            type="text"
            placeholder="Invoice Date"
            style={{ width: "40%", height: "2rem", margin: "0px 2rem" }}
          />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: " 3fr 1fr 1fr 1fr 1fr", // same as input row
          padding: "10px 2rem",
          backgroundColor: "gray",
          fontWeight: "bold",
          color: "white",
        }}>
        <h4>Product Name</h4>
        <h4>Quantity</h4>
        <h4>Price</h4>
        <h4>GST Rate</h4>
        <h4>Total</h4>
      </div>

      {lineItems.map((item, index) => (
        <div
          key={index}
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr 0.5fr",
            gap: "20px",
            padding: "10px 2rem",
            alignItems: "center",
          }}>
          <input
            type="text"
            placeholder="Product Name"
            value={item.productName}
            onChange={(e) =>
              handleItemChange(index, "productName", e.target.value)
            }
            style={{ height: "2rem" }}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) =>
              handleItemChange(index, "quantity", e.target.value)
            }
            style={{ height: "2rem" }}
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(index, "price", e.target.value)}
            style={{ height: "2rem" }}
          />
          <select
            value={item.gstRate}
            onChange={(e) => handleItemChange(index, "gstRate", e.target.value)}
            style={{ height: "2rem" }}>
            <option value="">GST %</option>
            <option value="0">0%</option>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>
          <input
            type="text"
            placeholder="Total"
            value={item.total}
            readOnly
            style={{ height: "2rem", backgroundColor: "#f0f0f0" }}
          />
          <button
            onClick={() => handleRemoveItem(index)}
            style={{
              height: "2rem",
              backgroundColor: "transparent",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "2rem",
            }}>
            ❌
          </button>
        </div>
      ))}

      <button
        onClick={handleAddItem}
        style={{ marginLeft: "2rem", marginTop: "1rem" }}>
        ➕ Add Item
      </button>
    </div>
  );
};

export default NewinvoiceLayout;
