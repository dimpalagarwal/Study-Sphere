import React, { useState } from "react";

export function Tabs({ children, defaultValue }) {
  const [active, setActive] = useState(defaultValue || "tab1");

  // clone children and inject active state
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { active, setActive })
  );
}

export function TabsList({ children, className, active, setActive }) {
  return (
    <div className={`flex gap-2 ${className || ""}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  );
}

export function TabsTrigger({ children, value, active, setActive, className }) {
  const isActive = active === value;
  return (
    <button
      type="button"
      onClick={() => setActive(value)}
      className={`px-4 py-2 rounded-md ${isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"} ${className || ""}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, active, className }) {
  if (active !== value) return null;
  return <div className={className || ""}>{children}</div>;
}
