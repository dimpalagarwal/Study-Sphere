import React from "react";

export function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4"
        aria-label="Main"
      >
        {/* Logo / Brand */}
        <a href="/" className="flex items-center gap-2" aria-label="Home">
          <div className="h-8 w-8 rounded-full bg-blue-600" aria-hidden="true" />
          <span className="text-lg font-semibold text-gray-900">
            StudySphere
          </span>
        </a>

        {/* Nav Links */}
        <div className="flex items-center gap-3">
          <a
            href="#about"
            className="px-3 py-1.5 text-sm text-gray-700 rounded-md transition-all 
                       hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-300"
          >
            About
          </a>
          <a
            href="#resources"
            className="px-3 py-1.5 text-sm text-gray-700 rounded-md transition-all 
                       hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-300"
          >
            Resources
          </a>
          <a
            href="#contact"
            className="px-3 py-1.5 text-sm text-gray-700 rounded-md transition-all 
                       hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-300"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
