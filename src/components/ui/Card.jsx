import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => {
  return (
    <div
      className={`glass rounded-2xl shadow-sm border border-gray-100 transition-all duration-300
        ${hover ? 'hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1' : ''}
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
