import React from "react";
export default function Header() {
  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">TinyLink Manager</h2>

      <div className="text-gray-600">
        Made with ❤️ by You
      </div>
    </header>
  );
}
