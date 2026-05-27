import React from 'react';

const Input = ({ 
  className = '', 
  error = false,
  ...props 
}) => {
  return (
    <input
      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50
        ${error 
          ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/50' 
          : 'border-gray-200 bg-white focus:border-primary focus:bg-primary/5'
        }
        ${className}`}
      {...props}
    />
  );
};

export default Input;
