import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Components/Home";
import Layout from "../Components/Layout";
import Invoices from "../Components/Invoices";
import Quotations from "../Components/Quotations";
import Inventory from "../Components/Inventory";
import Customers from "../Components/Customers";
import Newinvoice from "../Components/Newinvoice";
import NewinvoiceLayout from "../Components/NewinvoiceLayout";
import CustomerForm from "../Components/CustomerForm";
import NewInventoryItem from "../Components/NewInventoryItem";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/customers", element: <Customers /> },
      { path: "/invoices", element: <Invoices /> },
      { path: "/newinvoice", element: <NewinvoiceLayout /> },
      { path: "/newcustomer", element: <CustomerForm /> },
      { path: "/quotations", element: <Quotations /> },
      { path: "/inventory", element: <Inventory /> },
      { path: "/newinventory", element: <NewInventoryItem /> },
      { path: "/newinventory/:id", element: <NewInventoryItem /> },
    ],
  },
]);
const Router = () => {
  return <RouterProvider router={router} />;
};
export default Router;
