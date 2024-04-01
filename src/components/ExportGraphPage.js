import "./ExportGraphPage.css"
import axios from 'axios';
import React, { useState } from 'react';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';

const ExportGraphPage = ({ open, onClose, nodes, edges }) => {
    const [logFile, setLogFile] = useState('')
    const [format, setFormat] = useState("Image")
    const [imageFormat, setImageFormat] = useState("JPEG")
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    if (!open) {
        return null
    }

    // [TO-DO]
    const exportGraph = async (event) => {
        try {
            event.preventDefault()
            console.log("Exported as: ")
            setShowSuccess(true);
            // const response = await axios.post()
        }
        catch (e) {
            setShowFail(true);
        }
    }

    const closeMessage = () => {
        setShowFail(false)
        setShowSuccess(false)
    } 

    return (
        <div className="export-graph-overlay">
            <div className="export-graph-modal">
                <h1>Export Graph</h1>
                <p>Select an export format</p>
                <p className="close-button-export-graph" onClick={onClose}>X</p>
                <form className="export-graph-form" onSubmit={(event) => { exportGraph(event) }}>
                    <label>
                        <input type="radio" name="image-format"  value={"Image"} checked={format === "Image"} onChange={(e) => { setFormat(e.target.value)}}></input>
                        Image
                    </label>
                    {format === "Image"  && (
                    <>
                    <br></br>
                    <br></br>
                    <label>
                        Select image format
                        <br></br>
                        <br></br>
                        <select value={imageFormat} onChange={(e) => setImageFormat(e.target.value)}>
                            <option value="jpeg">JPEG</option>
                            <option value="png">PNG</option>
                        </select>
                    </label>
                    </>
                    )}
                    <br></br>
                    <br></br>
                    <label>
                        <input type="radio" name="csv-format" value={"CSV"} checked={format === "CSV"} onChange={(e) => { setFormat(e.target.value)}}></input>
                        CSV File
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                        Export Location<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input className="export-location" type="text" name="string-log-directory" required onKeyUp={() => { setLogFile(document.querySelector('input[name="string-log-directory"]').value) }}></input>
                        <p>or</p>
                        <input type="file" name="log-directory" onChange={() => { setLogFile(document.querySelector('input[name="log-directory"]').value) }} />
                    </label>
                    <button className="cancel-export-button" onClick={onClose}>Cancel</button>
                    <input type="submit" value="Export" className="export-graph-confirm-button" />
                    {(showSuccess && (
                        <SuccessMessage
                            message={'Success: Graph was exported'}
                            onClose={closeMessage}
                        />)) || (showFail && (
                            <FailMessage
                                message={'Error: Unable to export graph'}
                                onClose={closeMessage}
                            />
                        ))}
                </form>
            </div>
        </div>
    )
}

export default ExportGraphPage