import React, { useState } from 'react';
import "./EditNodePage.css"
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';

const EditNodePage = ({ open, onClose, node, nodes, setFetchEvents, project }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [nodeDate, setNodeDate] = useState("");
    const [nodeTime, setNodeTime] = useState("");
    const [nodeInitials, setNodeInitials] = useState("");
    const [nodeTeam, setNodeTeam] = useState("");
    const [nodePosture, setNodePosture] = useState("");
    const [nodeLocation, setNodeLocation] = useState("");
    const [nodeVector, setNodeVector] = useState("");
    const [nodeSource, setNodeSource] = useState("");
    const [nodeHost, setNodeHost] = useState("");
    const [nodeDescription, setNodeDescription] = useState("");
    const [nodeIcon, setNodeIcon] = useState("");
    const [nodeAuto, setNodeAuto] = useState("")

    const editNode = async (event) => {

        event.preventDefault()

        // console.log("Node: ", node)

        const parsedHost = nodeHost.split(",").map((host) => host.trim())

        const icon = `default_${nodeIcon.toLowerCase()}`

        const eventData = {
            id : node.data.eventData.id, timestamp: nodeDate + " " + nodeTime, initials: nodeInitials, team: nodeTeam, posture: nodePosture,
            location: nodeLocation, vectorID: nodeVector, sourceHost: nodeSource, targetHostList: parsedHost,
            description: nodeDescription, icon: icon, auto: nodeAuto, xCord : node.data.eventData.xCord,
            yCord : node.data.eventData.yCord, adjList: node.data.eventData.adjList
        }

        const data = {
            eventData, project
        }

        
        try {
            // [TO DO]: Change to how node function is actually set up
            await axios.post('http://127.0.0.1:5000/updateEvent', data)
            //  nodes(prev => (
            //      // Iterate through node list
            //      prev.map((p) => {
            //          // Only edit node that matches node
            //          if (p.id === node.id) {
            //              // Traverse nodeData and track non-null values and updated them in copy of node 
            //              const updatedNode = Object.keys(nodeData).reduce((acc, i) => {
            //                  if (nodeData[i] !== null && nodeData[i] !== undefined && nodeData[i] !== "") {
            //                      acc[i] = nodeData[i]
            //                  }
            //                  return acc
            //              }, {...node}) 
            //              return updatedNode
            //          }
            //          return {...p}
            //      })
            //  ))
             console.log(data)
             setShowSuccess(true);
             setFetchEvents(true)
        }
        catch (error) {
            console.log("FAIL")
            setShowFail(true);
        }
    };

    if (!open || !node) {
        return null
    }
    
    const closeMessage = () => {
        setShowFail(false)
        setShowSuccess(false)
    }

    return (
        <div className="edit-node-overlay">
            <div className="edit-node-modal">
                <h1>Edit Node</h1>
                <p className="close-button-edit-node" onClick={onClose}>X</p>
                <form className="edit-node-form" onSubmit={(currNode) => {editNode(currNode)}}>
                <label>
                        Date
                        <br></br>
                        <input type="date" name="node-date" defaultValue={node.data.timestamp.split(" ")[0]} onChange={() => {setNodeDate(document.querySelector('input[name="node-date"]').value)}} />
                    </label>
                    <br></br>
                    <label>
                        Time
                        <br></br>
                        <input type="time" name="node-time" defaultValue={node.data.eventData.timestamp.split(" ")[1]} onChange={() => {setNodeTime(document.querySelector('input[name="node-time"]').value)}} placeholder='hh:mm:ss'/>
                    </label>
                    <label>
                        Initials
                        <br></br>
                        <input type="text" name="node-initials" defaultValue={node.data.eventData.initials} onKeyUp={() => {setNodeInitials(document.querySelector('input[name="node-initials"]').value)}} placeholder="III"/>
                    </label>
                    <br></br>
                    <label>
                        Team
                        <br></br>
                        <select name="node-team" defaultValue={node.data.eventData.team} onChange={(team) => {setNodeTeam(team.target.value)}}>
                            <option className="node-white" value="White">White</option>
                            <option className="node-red" value="Red">Red</option>
                            <option className="node-blue" value="Blue">Blue</option>
                        </select>
                    </label>
                    <br></br>
                    <label>
                        TOA Icon<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <select name="node-icon" required defaultValue={node.data.eventData.icon} onChange={(icon) => { setNodeTeam(icon.target.value) }}>
                            <option className="node-white" value="White">White</option>
                            <option className="node-red" value="Red">Red</option>
                            <option className="node-blue" value="Blue">Blue</option>
                            <option className="node-detect" value="Detect">Detect</option>
                            <option className="node-protect" value="Protect">Protect</option>
                            <option className="node-react" value="React">React</option>
                            <option className="node-restore" value="Restore">Restore</option>
                        </select>
                    </label>
                    <label>
                        Posture
                        <br></br>
                        <input type="text" name="node-posture" defaultValue={node.data.eventData.posture} onKeyUp={() => {setNodePosture(document.querySelector('input[name="node-posture"]').value)}}/>
                    </label>
                    <label>
                        Location
                        <br></br>
                        <input type="text" name="node-location" defaultValue={node.data.eventData.location} onKeyUp={() => {setNodeLocation(document.querySelector('input[name="node-location"]').value)}}/>
                    </label>
                    <label>
                        Vector ID
                        <br></br>
                        <input type="text" name="node-vector" defaultValue={node.data.eventData.vectorID} onKeyUp={() => {setNodeVector(document.querySelector('input[name="node-vector"]').value)}}/>
                    </label>
                    <label>
                        Source Host
                        <br></br>
                        <input type="text" name="node-source" defaultValue={node.data.eventData.sourceHost} onKeyUp={() => {setNodeSource(document.querySelector('input[name="node-source"]').value)}}  placeholder="0.0.0.0"/>
                    </label>
                    <label>
                        Target Host[s]
                        <br></br>
                        <input type="text" name="node-host" defaultValue={node.data.eventData.targetHostList} onKeyUp={() => {setNodeHost(document.querySelector('input[name="node-host"]').value)}} placeholder="0.0.0.0, 0.0.0.1"/>
                    </label>
                    <label>
                        Description
                        <br></br>
                        <input type="text" name="node-description" defaultValue={node.data.eventData.description} onKeyUp={() => {setNodeDescription(document.querySelector('input[name="node-description"]').value)}}/>
                    </label>
                    <label>
                        Auto Edit Edges
                        <br></br>
                        <input type="checkbox" name="node-auto" defaultChecked={node.data.eventData.isMalformed} onChange={() => {setNodeAuto(!nodeAuto)}}/>
                    </label>
                    <br></br>
                    <button className="cancel-node-button" onClick={onClose}>Cancel</button>
                    <input type="submit" value="Edit Node" className="edit-node-confirm-button"/>
                    {(showSuccess && (
                <SuccessMessage
                  message={'Success: Node was edited'}
                  onClose={closeMessage}
                />)) || (showFail && (
                    <FailMessage
                      message={'Error: Unable to edit Node'}
                      onClose={closeMessage}
                    />
                  ))}
                </form>
                
            </div>
        </div>
    )
}

export default EditNodePage