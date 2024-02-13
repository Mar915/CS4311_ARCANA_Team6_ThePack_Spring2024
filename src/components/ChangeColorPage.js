// ChangeColorPage.js
import React, { useState } from 'react';
import SuccessMessage from './SuccessMessage';
import './ChangeColorPage.css';

function ChangeColorPage() {
  const [colorScheme, setColorScheme] = useState('default');
  const [showSuccess, setShowSuccess] = useState(false); // State to control the visibility of the SuccessMessage

  const handleColorChange = (scheme) => {
    setColorScheme(scheme);
  };

  const saveColorScheme = () => {
    localStorage.setItem('colorScheme', colorScheme);
    setShowSuccess(true); // Show the success message
    // Additional logic to apply the color scheme to the page
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false); // Hide the success message
  };

  return (
    <div className="change-color-page">
      <h1>Change Website Color</h1>
      <p>Select a color scheme. If you would like to apply the color scheme permanently, please click save.</p>
      <div className="color-options">
        <label className="color-option">
          <input
            type="radio"
            name="colorScheme"
            value="default"
            checked={colorScheme === 'default'}
            onChange={() => handleColorChange('default')}
          />
          Default Color Scheme
        </label>
        <label className="color-option">
          <input
            type="radio"
            name="colorScheme"
            value="monochromatic"
            checked={colorScheme === 'monochromatic'}
            onChange={() => handleColorChange('monochromatic')}
          />
          Monochromatic Color Scheme *Recommended for users with color blindness
        </label>
      </div>
      <button className="save-button" onClick={saveColorScheme}>Save</button>
      {showSuccess && (
        <SuccessMessage
          message={colorScheme === 'default' ? 'Success: Default color scheme saved' : 'Success: Monochromatic color scheme saved'}
          onClose={closeSuccessMessage}
        />
      )}
    </div>
  );
}

export default ChangeColorPage;
