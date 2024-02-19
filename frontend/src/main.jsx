import React from "react";
import ReactDOM from "react-dom/client"; // Rendering Components into the DOM
import "./index.css";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

// const router = createBrowserRouter(
//   createRoutesFromElements([
//     {
//       path: "/",
//       element: <App />,
//       children: [
//         {
//           path: "login",
//           element: <Login />,
//         },
//         {
//           path: "register",
//           element: <Register />,
//         },
//       ],
//       errorElement: <Error />,
//     },
//     {
//       path: "/profiles",
//       element: <Profiles />,
//       children: [
//         {
//           path: "/profiles/:id",
//           element: <Profiles />,
//         },
//       ],
//     },
//   ])
// );

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />} />)
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
