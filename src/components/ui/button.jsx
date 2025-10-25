
import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 font-semibold rounded-lg transition-all duration-300 
      bg-gradient-to-r from-[#00ff88] to-[#ff6b35] text-black hover:opacity-90 
      dark:from-[#ff6b35] dark:to-[#00ff88] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
