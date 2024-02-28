import React from 'react';
import './FailMessage.css';

function FailMessage({ message, onClose }) {
  return (
    <div className="fail-message">
      <span>{message}</span>
      <button onClick={onClose} className="close-button">X</button>
    </div>
  );
}

export default FailMessage;
