import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom"; // For routing
import { Provider } from "react-redux"; // Provides the store to the app
import store from "./redux/store.js"; // Stores state

// Auth Components
import Login from "./pages/authentication/Login.jsx";
import Register from "./pages/authentication/Register.jsx";

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
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
