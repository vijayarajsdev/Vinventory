import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getService, postService, putService } from "../services/apiservice";

const AddInventory = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the item ID from the URL
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    count: "",
  });

  useEffect(() => {
    if (id) {
      // Fetch the item details if an ID is present
      const fetchItem = async () => {
        try {
          const response = await getService(`/inventory/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching inventory item:", error);
        }
      };
      fetchItem();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update the item if an ID is present
        await putService(`/inventory/update/${id}`, formData);
      } else {
        // Add a new item if no ID is present
        await postService("/inventory/add", formData);
      }
      navigate("/inventory"); // Redirect back to inventory list
    } catch (error) {
      console.error("Error saving inventory item:", error);
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Inventory Item" : "Add New Inventory Item"}</h2>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", maxWidth: "500px",alignItems:"flex-start",marginLeft: "20px"}}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="Count"
          name="count"
          type="number"
          value={formData.count}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}>
          {id ? "Update Item" : "Add Item"}
        </Button>
      </form>
    </div>
  );
};

export default AddInventory;
