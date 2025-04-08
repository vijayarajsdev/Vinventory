import React, { useRef, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Newinvoice = () => {
  const invoiceRef = useRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [invoice, setInvoice] = useState({
    number: "TAX-001",
    date: new Date().toISOString().split("T")[0],
  });

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    gstin: "",
  });

  const [items, setItems] = useState([
    { description: "", hsn: "", quantity: 1, rate: 0, tax: 18 },
  ]);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] =
      field === "quantity" || field === "rate" || field === "tax"
        ? parseFloat(value) || 0
        : value;
    setItems(updated);
  };

  const addItem = () =>
    setItems([
      ...items,
      { description: "", hsn: "", quantity: 1, rate: 0, tax: 18 },
    ]);

  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const getSubtotal = () =>
    items.reduce((sum, item) => sum + item.quantity * item.rate, 0);

  const getTaxTotal = () =>
    items.reduce(
      (sum, item) => sum + (item.quantity * item.rate * item.tax) / 100,
      0
    );

  const handleDownload = async () => {
    const canvas = await html2canvas(invoiceRef.current);
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(img, "PNG", 0, 0, width, height);
    pdf.save(`${invoice.number}.pdf`);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }} ref={invoiceRef}>
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, mb: 2 }}>
          Tax Invoice
        </Typography>
        {/* Invoice Header */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Invoice Number"
              fullWidth
              value={invoice.number}
              onChange={(e) =>
                setInvoice({ ...invoice, number: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              fullWidth
              type="date"
              value={invoice.date}
              onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
            />
          </Grid>
        </Grid>
        {/* Customer Info */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Customer Details
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Customer Name"
              fullWidth
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Address"
              fullWidth
            //   multiline
            //   minRows={2}
              value={customer.address}
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="GSTIN"
              fullWidth
              value={customer.gstin}
              onChange={(e) =>
                setCustomer({ ...customer, gstin: e.target.value })
              }
            />
          </Grid>
        </Grid>
        {/* Invoice Items */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Items
        </Typography>
        {isMobile ? (
          <Box>
            {items.map((item, i) => (
              <Paper key={i} sx={{ mb: 2, p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      fullWidth
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(i, "description", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="HSN"
                      fullWidth
                      value={item.hsn}
                      onChange={(e) =>
                        handleItemChange(i, "hsn", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Quantity"
                      type="number"
                      fullWidth
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(i, "quantity", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Rate"
                      type="number"
                      fullWidth
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(i, "rate", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Tax (%)"
                      type="number"
                      fullWidth
                      value={item.tax}
                      onChange={(e) =>
                        handleItemChange(i, "tax", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "right" }}>
                    <Typography variant="subtitle2">
                      Total: ₹
                      {(
                        item.quantity *
                        item.rate *
                        (1 + item.tax / 100)
                      ).toFixed(2)}
                    </Typography>
                    <IconButton onClick={() => removeItem(i)} color="error">
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Box>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>HSN</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Rate</TableCell>
                  <TableCell align="right">Tax (%)</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <TextField
                        variant="standard"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(i, "description", e.target.value)
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="standard"
                        value={item.hsn}
                        onChange={(e) =>
                          handleItemChange(i, "hsn", e.target.value)
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        variant="standard"
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(i, "quantity", e.target.value)
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        variant="standard"
                        type="number"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(i, "rate", e.target.value)
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        variant="standard"
                        type="number"
                        value={item.tax}
                        onChange={(e) =>
                          handleItemChange(i, "tax", e.target.value)
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell align="right">
                      ₹
                      {(
                        item.quantity *
                        item.rate *
                        (1 + item.tax / 100)
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeItem(i)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}

        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={addItem}
          sx={{ mt: 2 }}>
          Add Item
        </Button>
        {/* Totals */}
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Subtotal: ₹{getSubtotal().toFixed(2)}</Typography>
            <Typography>Total Tax: ₹{getTaxTotal().toFixed(2)}</Typography>
            <Typography variant="h6" mt={1}>
              Grand Total: ₹{(getSubtotal() + getTaxTotal()).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        {/* Notes */}
        <TextField
          label="Notes / Terms"
          fullWidth
          multiline
          rows={3}
          sx={{ mt: 3 }}
        />
      </Paper>

      {/* PDF Download Button */}
      <Button
        variant="contained"
        onClick={handleDownload}
        sx={{ mt: 3 }}
        color="primary">
        Download PDF
      </Button>
    </Container>
  );
};

export default Newinvoice;
