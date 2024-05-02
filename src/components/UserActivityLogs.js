import React, { useState } from 'react';
import './UserActivityLogs.css';
import { IoIosRefresh } from "react-icons/io";

export default function UserActivityLogs({navigateTo}) {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(false);

  const loadLogs = async () => {
    try {
      setError(false);
      const response = await fetch('http://127.0.0.1:5000/userLogs');
      const data = await response.json();
      setLogs(data);
      console.log("Logs loaded.");
    } catch (e) {
      console.error('Failed to load logs:', e);
      setError(true);
    }
  };

  const handleRefresh = () => {
    loadLogs();
  };

  const handleCloseError = () => {
    setError(false);
  };

  return (
    <div className="ActivityLogs">
      <main className="UAL-main">
        <div className="user-activity-logs">
          <div className="log-header">
            <h2>User Activity Logs</h2>
            <button onClick={handleRefresh}><IoIosRefresh /></button>
          </div>
          <div className="log-content">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index}>
                  <p>[{log.initials}] [{log.timestamp}] {log.statement}</p>
                </div>
              ))
            ) : (
              <div className="empty-logs">No logs to display</div>
            )}
          </div>
        </div>
        {error && (
          <div className="error-message">
            <p>Error: Unable to load user activity logs. Please refresh to try again.</p>
            <button className="close-button" onClick={handleCloseError}>X</button>
          </div>
        )}
      </main>
    </div>
  );
}
