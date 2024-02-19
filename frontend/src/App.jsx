import React from "react";
import { Outlet } from "react-router-dom"; // Nested routing
import Navigation from "./pages/authentication/Navigation";
import { ToastContainer } from "react-toastify"; // Displaying toast notifications.
import "react-toastify/dist/ReactToastify.css"; // Styling for toast notifications.

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
