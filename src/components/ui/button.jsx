import React from "react";

export function Button({ children, className, variant, ...props }) {
  let base = "px-4 py-2 font-medium rounded-md transition-colors";
  if (variant === "outline") {
    base += " border border-gray-300 bg-transparent text-gray-800 hover:bg-gray-100";
  } else {
    base += " bg-blue-600 text-white hover:bg-blue-700";
  }
  return (
    <button className={`${base} ${className || ""}`} {...props}>
      {children}
    </button>
  );
}
