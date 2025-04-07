import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Components/Home";
import Layout from "../Components/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/customers", element: <Home /> },
      { path: "/invoices", element: <Home /> },
      { path: "/quotations", element: <Home /> },
      { path: "/inventory", element: <Home /> },
    ],
  },
]);
const Router = () => {
  return <RouterProvider router={router} />;
};
export default Router;
