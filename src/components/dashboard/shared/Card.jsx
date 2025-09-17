import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between w-64">
      {children}
    </div>
  );
};

export default Card;