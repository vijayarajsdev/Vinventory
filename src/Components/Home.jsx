import React from "react";
import "../styles/Home.css";
const Home = () => {
  return (
    <div className="home">
      <h2>DASHBOARD</h2>
      <div className="cards">
        <div className="card">
          <h3>Daily Sales</h3>
          <p>0</p>
        </div>
        <div className="card">
          <h3>Monthly Sales</h3>
          <p>0</p>
        </div>
        <div className="card">
          <h3>Expenses</h3>
          <p>0</p>
        </div>
        <div className="card">
          <h3>Inventory</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
