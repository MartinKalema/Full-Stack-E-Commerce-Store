import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./pages/authentication/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Functional component representing the main app.
 * @return {JSX.Element} JSX representing the app component.
 */

export default function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}
