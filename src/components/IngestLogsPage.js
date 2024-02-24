import React, { useState } from 'react';
import './InjestLogsPage.css';

const IngestLogsPage = ({ open, onClose }) => {
    if (!open) {
        return null
    }

    return (
        <div className="ingest-log-overlay">
            <div className="ingest-log-modal">
                <h1>Ingest Logs</h1>
                <p>Select a directory to ingest logs from</p>
                <p className="close-button" onClick={onClose}>X</p>
                <form className="ingest-log-form">
                    <label>
                        Log Directory<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="string-log-directory" required></input>
                        <p>or</p>
                        <input type="file" name="log-directory" required/>
                    </label>
                    <br></br>
                    <button className="cancel-ingest-button" onClick={onClose}>Cancel</button>
                    <input type="submit" value="Ingest Logs" className="ingest-log-confirm-button"/>
                </form>
            </div>
        </div>
    );
}

export default IngestLogsPage;