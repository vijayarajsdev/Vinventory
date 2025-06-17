import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Routing/Router.jsx";
import "./main.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
