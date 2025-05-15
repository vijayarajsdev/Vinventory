import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidenavbar.css";
const Sidenavbar = () => {
  return (
    <div className="nav-wrapper">
      <h2 className="nav-logo">VINVENTORY</h2>
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/customers">
        Customers
      </Link>
      <Link className="nav-link" to="/invoices">
        Invoices
      </Link>
      {/* <Link className="nav-link" to="/quotations">
        Quotations
      </Link> */}
      <Link className="nav-link" to="/inventory">
        Inventory
      </Link>
    </div>
  );
};

export default Sidenavbar;
