import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidenavbar from "./Sidenavbar";
import "../styles/Layout.css";
import MenuIcon from "@mui/icons-material/Menu";
const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth <= 768
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="layout">
      {!isOpen && (
        <div className="menu-icon">
          <MenuIcon sx={{ color: "#1a202c" }} onClick={toggleMenu} />
        </div>
      )}
      <div ref={sidebarRef} className={`side-menu ${isOpen ? "show" : ""}`}>
        <Sidenavbar />
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
