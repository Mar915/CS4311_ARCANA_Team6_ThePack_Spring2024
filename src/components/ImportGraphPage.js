import "./ImportGraphPage.css"
import axios from 'axios';
import React, { useState } from 'react';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';

const ImportGraphPage = ({ open, onClose, nodes, edges, project }) => {
    const [logFile, setLogFile] = useState('')
    const [merge, setMerge] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    if (!open) {
        return null
    }

    // [TO-DO]
    const importGraph = async (event) => {
        try {
            event.preventDefault()
            console.log("Graph ingested")
            setShowSuccess(true);
            // setFetchProjectData(true)
        }
        catch (e) {
            console.log("FAIL")
            setShowFail(true);
        }
    }

    const closeMessage = () => {
        setShowFail(false)
        setShowSuccess(false)
    } 

    return (
        <div className="import-graph-overlay">
            <div className="import-graph-modal">
                <h1>Import Graph</h1>
                <p>Select a graph file to import from</p>
                <p className="close-button-import-graph" onClick={onClose}>X</p>
                <form className="import-graph-form" onSubmit={(event) => { importGraph(event) }}>
                    <label>
                        Graph File<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="string-log-directory" required onKeyUp={() => { setLogFile(document.querySelector('input[name="string-log-directory"]').value) }}></input>
                        <p>or</p>
                        <input type="file" name="log-directory" onChange={() => { setLogFile(document.querySelector('input[name="log-directory"]').value) }} />
                    </label>
                    <br></br>
                    <label>
                        <input type="checkbox" name="merge-graph" onChange={() => { setMerge(document.querySelector('input[name="merge-graph"]').value)}}/>
                        Merge with current event graph
                    </label>
                    <br></br>
                    <button className="cancel-import-button" onClick={onClose}>Cancel</button>
                    <input type="submit" value="Import" className="import-graph-confirm-button" />
                    {(showSuccess && (
                        <SuccessMessage
                            message={'Success: Graph was imported'}
                            onClose={closeMessage}
                        />)) || (showFail && (
                            <FailMessage
                                message={'Error: Unable to import graph'}
                                onClose={closeMessage}
                            />
                        ))}
                </form>
            </div>
        </div>
    )
}

export default ImportGraphPage