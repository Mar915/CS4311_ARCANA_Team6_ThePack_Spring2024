// App.js
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import MainMenu from './components/MainMenu';
import ChangeColorPage from './components/ChangeColorPage'; // Import the new component
import './App.css';
import ManageProjectPage from './components/ManageProjectPage';
import ManageEventPage from './components/ManageEventPage';
import TempProjectPage from './components/TempProjectPage';
import SyncConnectionPage from './components/SyncConnectionPage';
import SyncMenuPage from './components/SyncMenuPage';
import ManageGraphPage from './components/ManageGraphPage';


function App() {
  // State to track which menu or page should be displayed
  const [currentPage, setCurrentPage] = useState('mainMenu');
  // State to track project to pass
  const [selectedProject, setSelectedProject] = useState(null);
  // State to track eventList to pass
  const [eventList, setSelectedEventList] = useState([])

  // Function to change the current page
  const navigateTo = (page, project, eventList) => {
    setCurrentPage(page);
    setSelectedProject(project)
    setSelectedEventList(eventList)
  };

  return (
    <div className="App">
      <NavBar navigateTo={navigateTo} />
      {currentPage === 'mainMenu' && <MainMenu navigateTo={navigateTo} />}
      {currentPage === 'changeColor' && <ChangeColorPage/>}
      {currentPage === 'manageProjects' && <ManageProjectPage navigateTo={navigateTo} />}
      {currentPage === 'syncProjects' && <SyncConnectionPage navigateTo={navigateTo} />}
      {currentPage === 'tempProjectPage' && <TempProjectPage navigateTo={navigateTo} project={selectedProject}/>}
      {currentPage === 'manageEventPage' && <ManageEventPage navigateTo={navigateTo} project={selectedProject}/>}
      {currentPage === 'syncMenuPage' && <SyncMenuPage navigateTo={navigateTo} />}
      {currentPage === "manageGraphPage" && <ManageGraphPage navigateTo={navigateTo} project={selectedProject} eventList={eventList}/>}

      {/* [TO DO]: Switch route to event page */}
    </div>
  );
}

export default App;
