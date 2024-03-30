import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import './SyncRequestPage.css';

const SyncRequestPage = () => {
//  const history = useHistory();

  const handleReturnToSyncMenu = () => {
    // Navigate back to SyncMenuPage
   
  };

  return (
    <div>
      <h1>Sync Request Page</h1>
      <p>Text here...</p>
      <table>
        <thead>
          <tr>
            <th>IP Address</th>
            <th>Projects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows with data will go here */}
        </tbody>
      </table>
      <button onClick={handleReturnToSyncMenu}>Return to Sync Menu</button>
    </div>
  );
};

export default SyncRequestPage;