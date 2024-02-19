import React from "react";
import ReactDOM from "react-dom/client"; // Rendering react components into the DOM
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

// Route is a component used for defining routes within a react application. It specifies the URL path and the component to render when the path matches.

// RouteProvider is a component that provides routing context(routing information) to its children.

// createRoutesFromElements is a function that takes an array of react elements and returns an array of routes. It's used to create route configurations. It's a more declarative way to define routes.

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />} />)
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
