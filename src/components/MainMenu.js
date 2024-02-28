import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faProjectDiagram, faClockRotateLeft, faPaintbrush} from '@fortawesome/free-solid-svg-icons';
import './MainMenu.css';

function MainMenu({ navigateTo }) {
  return (
    <div className="main-menu">
      <h1>Main Menu</h1>
      <button className="menu-option" onClick={() => navigateTo('manageProjects')}><FontAwesomeIcon icon = {faProjectDiagram}/> Manage Projects </button>
      <button className="menu-option" onClick={() => navigateTo('syncProjects')}><FontAwesomeIcon icon = {faSync}/> Sync Projects</button>
      <button className="menu-option" onClick={() => navigateTo('viewLogs')}><FontAwesomeIcon icon= {faClockRotateLeft }/> View User Activity Logs</button>
      <button className="menu-option" onClick={() => navigateTo('changeColor')}><FontAwesomeIcon icon={faPaintbrush} /> Change Website Color</button>
    </div>
  );
}

export default MainMenu;
