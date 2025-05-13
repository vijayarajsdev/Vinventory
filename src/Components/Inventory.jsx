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
import "../styles/Invoices.css"; // Reusing the same styles for consistency
import {
  getService,
  postService,
  putService,
  deleteService,
} from "../services/apiservice";

const Inventory = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await getService("/inventory");
        setInventoryItems(response.data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchInventory();
  }, []);

  const deleteItem = async (id) => {
    try {
      await deleteService(`/inventory/delete/${id}`);
      setInventoryItems(inventoryItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
  };

  return (
    <div>
      <h2>Inventory</h2>
      <div className="invoice-btn-wrapper">
        <Button
          variant="contained"
          color="primary"
          style={{
            fontSize: "0.8rem",
            padding: "5px 10px",
          }}
          onClick={() => navigate("/newinventory")}>
          Add Inventory
        </Button>
      </div>
      {inventoryItems?.length === 0 ? (
        <div className="invoice-err-msg">
          <h3>No Inventory Items Found</h3>
          <p>Click on the button above to add an inventory item.</p>
        </div>
      ) : isMobile ? (
        <div style={{ padding: "10px" }}>
          {inventoryItems.map((item) => (
            <div key={item._id} className="invoice-mbl-wrapper">
              <div className="invoice-mbl-header">
                <p className="invoice-mbl-general">{item.name}</p>
                <p className="invoice-mbl-general">₹{item.price}</p>
              </div>
              <p className="invoice-mbl-general">Count: {item.count}</p>
              <Button
                variant="contained"
                color="primary"
                style={{
                  fontSize: "0.8rem",
                  padding: "5px 10px",
                  marginTop: "10px",
                }}
                onClick={() => navigate(`/inventory/edit/${item._id}`)}>
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  fontSize: "0.8rem",
                  padding: "5px 10px",
                  marginTop: "10px",
                }}
                onClick={() => deleteItem(item._id)}>
                Delete
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        fontSize: "0.8rem",
                        padding: "5px 10px",
                        marginRight: "10px",
                      }}
                      onClick={() => navigate(`/newinventory/${item._id}`)}>
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{
                        fontSize: "0.8rem",
                        padding: "5px 10px",
                      }}
                      onClick={() => deleteItem(item._id)}>
                      Delete
                    </Button>
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

export default Inventory;
