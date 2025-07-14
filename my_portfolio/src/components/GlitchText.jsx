import React from 'react';
import './glitch.css'; // We'll define this next

const GlitchText = ({ children }) => (
  <h2 className="glitch" data-text={children}>
    {children}
  </h2>
);

export default GlitchText;
