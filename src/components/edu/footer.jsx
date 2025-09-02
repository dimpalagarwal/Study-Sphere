import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#0a1a3c] text-gray-300">
      <div className="mx-auto w-full px-6 py-6 text-sm">
        <div className="flex items-center justify-between">
          <p>&copy; {new Date().getFullYear()} StudySphere. All rights reserved.</p>
          <nav className="flex gap-6" aria-label="Footer">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Help
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
