import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Components/Home";
import Layout from "../Components/Layout";
import Invoices from "../Components/Invoices";
import Quotations from "../Components/Quotations";
import Inventory from "../Components/Inventory";
import Customers from "../Components/Customers";
import Newinvoice from "../Components/Newinvoice";
import NewinvoiceLayout from "../Components/NewinvoiceLayout";
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
      { path: "/quotations", element: <Quotations /> },
      { path: "/inventory", element: <Inventory /> },
    ],
  },
]);
const Router = () => {
  return <RouterProvider router={router} />;
};
export default Router;
