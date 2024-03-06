// App.js
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import MainMenu from './components/MainMenu';
import ChangeColorPage from './components/ChangeColorPage'; // Import the new component
import './App.css';
import ManageProjectPage from './components/ManageProjectPage';
import TempProjectPage from './components/TempProjectPage';
import viewLogs from './components/viewLogs';
function App() {
  // State to track which menu or page should be displayed
  const [currentPage, setCurrentPage] = useState('mainMenu');
  // State to track project to pass
  const [selectedProject, setSelectedProject] = useState(null);

  // Function to change the current page
  const navigateTo = (page, project) => {
    setCurrentPage(page);
    setSelectedProject(project)
  };

  return (
    <div className="App">
      <NavBar navigateTo={navigateTo} />
      {currentPage === 'mainMenu' && <MainMenu navigateTo={navigateTo} />}
      {currentPage === 'changeColor' && <ChangeColorPage />}
      {currentPage === 'manageProjects' && <ManageProjectPage navigateTo={navigateTo} />}
      {currentPage === 'viewLogs' && <viewLogs navigateTo={navigateTo} />}

     {/* [TO DO]: Switch route to event page */}
      {currentPage === 'tempProjectPage' && <TempProjectPage navigateTo={navigateTo} project={selectedProject}/>}
    </div>
  );
}

export default App;
