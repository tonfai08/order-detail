"use client";

import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">About Page</h1>
        <nav className="hidden md:flex p-4">
          <a href="#" className="px-4 py-2 hover:underline">
            Home
          </a>
          <a href="#" className="px-4 py-2 hover:underline">
            About
          </a>
          <a href="#" className="px-4 py-2 hover:underline">
            Services
          </a>
          <a href="#" className="px-4 py-2 hover:underline">
            Contact
          </a>
        </nav>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <nav
          className={`absolute top-16 left-0 w-full bg-blue-600 p-4 transition-all duration-300 ease-in-out transform origin-top  ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          <a href="#" className="block px-4 py-2 hover:underline">
            Home
          </a>
          <a href="#" className="block px-4 py-2 hover:underline">
            About
          </a>
          <a href="#" className="block px-4 py-2 hover:underline">
            Services
          </a>
          <a href="#" className="block px-4 py-2 hover:underline">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
