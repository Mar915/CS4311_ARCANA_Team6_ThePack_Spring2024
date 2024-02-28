// SuccessMessage.js
import React from 'react';
import './SuccessMessage.css';

function SuccessMessage({ message, onClose }) {
  return (
    <div className="success-message">
      <span>{message}</span>
      <button onClick={onClose} className="close-button">X</button>
    </div>
  );
}

export default SuccessMessage;
