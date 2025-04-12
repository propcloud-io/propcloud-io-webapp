import React from 'react';
import './ResponsiveFramework.css';

const ResponsiveFramework = ({ children }) => {
  return (
    <div className="responsive-framework">
      {children}
    </div>
  );
};

export default ResponsiveFramework;
