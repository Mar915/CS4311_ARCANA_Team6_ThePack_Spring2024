// ChangeColorPage.js
import React, { useState, useEffect } from 'react';
import SuccessMessage from './SuccessMessage';
import './ChangeColorPage.css';

function ChangeColorPage() {
  const [colorScheme, setColorScheme] = useState(localStorage.getItem('colorScheme') || 'default');
  const [showSuccess, setShowSuccess] = useState(false);

  const colorPreviews = {
    default: ['#007BFF', '#6C757D', '#28A745', '#DC3545'],
    monochromatic: ['#6C757D', '#5A6268', '#495057', '#343A40'],
  }

  const handleColorChange = (scheme) => {
    setColorScheme(scheme);
  };

  const applyColorScheme = (scheme) => {
    if (scheme === 'monochromatic') {
      document.body.classList.add('monochromatic');
    } else {
      document.body.classList.remove('monochromatic');
    }
  };

  const saveColorScheme = () => {
    localStorage.setItem('colorScheme', colorScheme);
    applyColorScheme(colorScheme);
    setShowSuccess(true);
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false);
  };

  return (
      <div className="change-color-page">
        <h1>Change Website Color</h1>
        <p>Select a color scheme. If you would like to apply the color scheme permanently, please click save.</p>
        <div className="color-options">
          <div className="color-option-container">
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
            <div 
              className={`color-preview ${colorScheme === 'default' ? 'selected-color-preview' : ''}`} 
              style={{ backgroundColor: colorPreviews.default[0] }}
            />
          </div>
          <div className="color-option-container">
            <label className="color-option">
              <input
                type="radio"
                name="colorScheme"
                value="monochromatic"
                checked={colorScheme === 'monochromatic'}
                onChange={() => handleColorChange('monochromatic')}
              />
              Monochromatic Color Scheme (*Recommended for users with color blindness*)
            </label>
            <div 
              className={`color-preview ${colorScheme === 'monochromatic' ? 'selected-color-preview' : ''}`}
              style={{ backgroundColor: colorPreviews.monochromatic[0] }}
            />
          </div>
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

