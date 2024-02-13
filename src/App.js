// App.js
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import MainMenu from './components/MainMenu';
import ChangeColorPage from './components/ChangeColorPage'; // Import the new component
import './App.css';

function App() {
  // State to track which menu or page should be displayed
  const [currentPage, setCurrentPage] = useState('mainMenu');

  // Function to change the current page
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <NavBar navigateTo={navigateTo} />
      {currentPage === 'mainMenu' && <MainMenu navigateTo={navigateTo} />}
      {currentPage === 'changeColor' && <ChangeColorPage />}
    </div>
  );
}

export default App;
