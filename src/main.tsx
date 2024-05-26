// Library imports
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";
import { RouterProvider } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";

// Local imports
import "./index.css";
import { router } from "./router/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer position="top-center" />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
