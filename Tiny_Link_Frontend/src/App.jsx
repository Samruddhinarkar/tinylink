import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RedirectPage from "./pages/RedirectPage";
import Layout from "./layout/Layout";
import { Toaster } from "react-hot-toast";
import React from "react";
import ViewLink from "./components/ViewLink";
import LinkForm from "./components/LinkForm";

export default function App() {
  return (
    <>
      {/* Global Toast Notifications */}
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 3000, // default duration
          style: {
            background: "#ffffff",
            color: "#333",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
            fontSize: "15px",
            fontWeight: 500,
          },

          // Success Toast
          success: {
            duration: 2500,
            style: {
              background: "#E8FDF5",
              color: "#0F766E",
              borderLeft: "5px solid #0D9488",
            },
            iconTheme: {
              primary: "#0D9488",
              secondary: "#ffffff",
            },
          },

          // Error Toast
          error: {
            duration: 3500,
            style: {
              background: "#FEE2E2",
              color: "#B91C1C",
              borderLeft: "5px solid #DC2626",
            },
            iconTheme: {
              primary: "#DC2626",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          {/* Dashboard */}
          <Route  path="/"  element={ <Layout>  <Dashboard /> </Layout>  }/>

          {/* Stats Page */}
          <Route
            path="/add-link"
            element={
              <Layout>
                <LinkForm/>
              </Layout>
            }
          />

          <Route
            path="/view/:code"
            element={
              <Layout>
                <ViewLink />
              </Layout>
            }
          />

          {/* Redirect Route (NO LAYOUT) */}
          <Route path="/:code" element={<RedirectPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
