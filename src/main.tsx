import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./Pages/Homepage";
import { Toaster } from "./components/ui/toaster";
import PageNotFound from "./components/Dummy/PageNotFound";
import NotesContextProvider from "./contexts/NotesContextProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Homepage />} />
      </Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </>,
  ),
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotesContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </NotesContextProvider>
  </React.StrictMode>,
);
