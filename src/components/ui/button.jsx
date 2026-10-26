
import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 font-semibold rounded-lg transition-all duration-300 
      bg-white text-black hover:bg-gray-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
