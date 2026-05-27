import React from 'react';

const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${className}`}
      style={{
        animation: 'shimmer 1.5s infinite',
      }}
      {...props}
    />
  );
};

export default Skeleton;
