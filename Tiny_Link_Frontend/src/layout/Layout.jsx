import Sidebar from "./Sidebar";
import Header from "./Header";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content section */}
      <div className="flex flex-col w-full min-h-screen">
        
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="p-6 bg-gray-100 flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="p-4 bg-white shadow text-center">
          © 2025 TinyLink. All rights reserved.
        </footer>

      </div>
    </div>
  );
}
