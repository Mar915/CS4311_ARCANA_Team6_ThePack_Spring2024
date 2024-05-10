import React from 'react';
import './NavBar.css';

function NavBar({ navigateTo }) { 
  return (
    <nav className="navbar">
      <span className="navbar-title">ARCANA</span>
      <button className="navbar-button" onClick={() => navigateTo('mainMenu')}>🏠</button>
      <button className="navbar-button" onClick={() => navigateTo('viewOpenedProject')}>View Opened Project</button>
      <button className='navbar-button' onClick={() => navigateTo('TOA')}>TOA Library</button>
      <button className="navbar-button" onClick={() => navigateTo('syncProjects')}>Sync Projects</button>
      <button className="navbar-button" onClick={() => navigateTo('manageProjects')}>Manage Projects</button>
    </nav>
  );
}

export default NavBar;
