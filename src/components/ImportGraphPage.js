import "./ImportGraphPage.css"
import axios from 'axios';
import React, { useState } from 'react';
import Papa from "papaparse";
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';

const ImportGraphPage = ({ open, onClose, setEventList, setList, setNodes, nodes, edges, project, setFetchEvents }) => {
    const [logFile, setLogFile] = useState(null)
    const [merge, setMerge] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    if (!open) {
        return null
    }

    // [TO-DO]
    const importGraph = async (event) => {
        event.preventDefault()

        const reader = new FileReader()
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, {
                header: true,
                complete: (results) => {
                    console.log(results)
                    console.log("Graph ingested")
                    const data = results.data.filter(item => !Object.values(item).every(value => value === "")).map(result => {
                        console.log(result.position.split(","))
                        const position = result.position.split(",")
                        const edgeList = result.AdjList.split("-")
                        const x = position[0] ? position[0] : "0" 
                        const y = position[1] ? position[1] : "0" 
                        return {
                            id: result.id,
                            dataSource: result.dataSource,
                            description: result.description,
                            icon: result.icon,
                            initials: result.initials,
                            isMalformed: result.isMalformed,
                            location: result.location,
                            timestamp: result.timestamp,
                            team: result.team,
                            posture: result.posture,
                            sourceHost: result.sourceHost,
                            targetHostList: result.targetHostList,
                            vectorID: result.vectorID,
                            xCord: x,
                            yCord: y,
                            AdjList: edgeList.map(item => {
                                return {
                                    id: item,
                                }
                            })
                        }
                    })
                    console.log(data)
                    setEventList(prev => [...prev, ...data])
                    setList(prev => [...prev, ...data])
                    setNodes(prev => [...prev, ...data])
                    setShowSuccess(true);
                    setFetchEvents(true)
                },
                error: (error) => {
                    console.log("FAIL")
                    setShowFail(true);
                }
            })
        }
        reader.readAsText(logFile)
        // const parsedData = csv.data
        // const rows = Object.keys(parsedData[0])

        // const cols = Object.values(parsedData[0])
        // const res = rows.reduce((acc, e, i) => {
        //     return [...acc, [[e], cols[i]]]
        // }, [])
        // setFetchProjectData(true)
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
                        <br></br>
                        <input type="file" required name="log-directory" accept=".csv" onChange={(e) => { setLogFile(e.target.files[0]) }} />
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                        <input type="checkbox" name="merge-graph" onChange={() => { setMerge(document.querySelector('input[name="merge-graph"]').value) }} />
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