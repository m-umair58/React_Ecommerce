import React from "react";
import { Outlet } from "react-router-dom";
import Header from '../components/HeaderComponent';

export default function RootLayout({ toggleSidebar, cart }) {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <header>
        <nav className="border-2 border-gray-800">
          <Header toggleSidebar={toggleSidebar} cart={cart}/>
        </nav>
      </header>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
