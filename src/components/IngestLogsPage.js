import React, { useState } from 'react';
import './InjestLogsPage.css';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';

const IngestLogsPage = ({ open, onClose }) => {
    const [logFile, setLogFile] = useState('')
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    if (!open) {
        return null
    }

    const ingestLog = async (event) => {
        event.preventDefault()
        const data = {
            logFile
        }

        try {
            //await axios.post('/ingestLogs/<projectName>/<directory>', data)
            console.log(data)
            setShowSuccess(true);
        } 
        catch (error) {
            console.log("FAIL")
            setShowFail(true);
        }

    };

    const closeMessage = () => {
        setShowFail(false)
        setShowSuccess(false)
    } 

    return (
        <div className="ingest-log-overlay">
            <div className="ingest-log-modal">
                <h1>Ingest Logs</h1>
                <p>Select a directory to ingest logs from</p>
                <p className="close-button-ingest-log" onClick={onClose}>X</p>
                <form className="ingest-log-form" onSubmit={(event) => {ingestLog(event)}}>
                    <label>
                        Log Directory<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="string-log-directory" required onKeyUp={() => {setLogFile(document.querySelector('input[name="string-log-directory"]').value)}}></input>
                        <p>or</p>
                        <input type="file" name="log-directory" onChange={() => {setLogFile(document.querySelector('input[name="log-directory"]').value)}}/>
                    </label>
                    <br></br>
                    <button className="cancel-ingest-button" onClick={onClose}>Cancel</button>
                    <input type="submit" value="Ingest Logs" className="ingest-log-confirm-button"/>
                    {(showSuccess && (
                <SuccessMessage
                  message={'Success: Logs were ingested'}
                  onClose={closeMessage}
                />)) || (showFail && (
                    <FailMessage
                      message={'Error: Unable to ingest logs'}
                      onClose={closeMessage}
                    />
                  ))}
                </form>
            </div>
        </div>
    );
}

export default IngestLogsPage;