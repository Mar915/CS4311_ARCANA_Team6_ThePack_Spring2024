import React, { useState } from 'react';
import "./EditNodePage.css"
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';

const EditNodePage = ({ open, onClose, node, nodes }) => {
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

    const editNode = async (currNode) => {

        currNode.preventDefault()

        // console.log("Node: ", node)

        const parsedHost = nodeHost.split(",").map((host) => host.trim())

        const data = {
            nodeDate, nodeTime, nodeInitials, nodeTeam, nodePosture, nodeLocation, nodeVector,
            nodeSource, parsedHost, nodeDescription,nodeIcon, nodeAuto, node
        }

        // Data source can't be edited so we need to pass it to edited node
        const ds = node.dataSource
        // Timestamp is concatenated so we have to ensure that it will stay that way
        let ts = ""
        if (nodeDate === "" && nodeTime === "") {
            ts = node.timestamp
        }
        else if (nodeDate === "" && nodeTime !== "") {
            ts = node.timestamp.split(" ")[0]+ " " + nodeTime
        }
        else if (nodeDate !== "" && nodeTime === "") {
            ts = nodeDate + " " + node.timestamp.split(" ")[1]
        }
        const nodeData = {
            timestamp: ts, initials: nodeInitials, team: nodeTeam, posture: nodePosture,
            location: nodeLocation, vectorID: nodeVector, sourceHost: nodeSource, 
            targetHostList: nodeHost, description: nodeDescription, icon: nodeIcon, 
            isMalformed: nodeAuto, dataSource: ds
        }
        try {
            // [TO DO]: Change to how node function is actually set up
            const response = await axios.post()
             nodes(prev => (
                 // Iterate through node list
                 prev.map((p) => {
                     // Only edit node that matches node
                     if (p.vectorID === node.vectorID) {
                         // Traverse nodeData and track non-null values and updated them in copy of node 
                         const updatedNode = Object.keys(nodeData).reduce((acc, i) => {
                             if (nodeData[i] !== null && nodeData[i] !== undefined && nodeData[i] !== "") {
                                 acc[i] = nodeData[i]
                             }
                             return acc
                         }, {...node}) 
                         return updatedNode
                     }
                     return {...p}
                 })
             ))
             console.log(data)
             setShowSuccess(true);
        }
        catch (error) {
            console.log("FAIL")
            setShowFail(true);
        }
    };

    if (!open) {
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
                        <input type="date" name="node-date" defaultValue={node.timestamp.split(" ")[0]} onChange={() => {setNodeDate(document.querySelector('input[name="node-date"]').value)}} />
                    </label>
                    <br></br>
                    <label>
                        Time
                        <br></br>
                        <input type="time" name="node-time" defaultValue={node.timestamp.split(" ")[1]} onChange={() => {setNodeTime(document.querySelector('input[name="node-time"]').value)}} placeholder='hh:mm:ss'/>
                    </label>
                    <label>
                        Initials
                        <br></br>
                        <input type="text" name="node-initials" defaultValue={node.initials} onKeyUp={() => {setNodeInitials(document.querySelector('input[name="node-initials"]').value)}} placeholder="III"/>
                    </label>
                    <br></br>
                    <label>
                        Team
                        <br></br>
                        <select name="node-team" defaultValue={node.team} onChange={(team) => {setNodeTeam(team.target.value)}}>
                            <option className="node-white" value="White">White</option>
                            <option className="node-red" value="Red">Red</option>
                            <option className="node-blue" value="Blue">Blue</option>
                        </select>
                    </label>
                    <br></br>
                    <label>
                        TOA Icon
                        <br></br>
                        <select name="node-icon" defaultValue={node.icon} onChange={(icon) => {setNodeIcon(icon.target.value)}}>
                            <option className="node-white" value="White">Default_White.png</option>
                            <option className="node-red" value="Red">Default_Red.png</option>
                            <option className="node-blue" value="Blue">Default_Blue.png</option>
                        </select>
                    </label>
                    <label>
                        Posture
                        <br></br>
                        <input type="text" name="node-posture" defaultValue={node.posture} onKeyUp={() => {setNodePosture(document.querySelector('input[name="node-posture"]').value)}}/>
                    </label>
                    <label>
                        Location
                        <br></br>
                        <input type="text" name="node-location" defaultValue={node.location} onKeyUp={() => {setNodeLocation(document.querySelector('input[name="node-location"]').value)}}/>
                    </label>
                    <label>
                        Vector ID
                        <br></br>
                        <input type="text" name="node-vector" defaultValue={node.vectorID} onKeyUp={() => {setNodeVector(document.querySelector('input[name="node-vector"]').value)}}/>
                    </label>
                    <label>
                        Source Host
                        <br></br>
                        <input type="text" name="node-source" defaultValue={node.sourceHost} onKeyUp={() => {setNodeSource(document.querySelector('input[name="node-source"]').value)}}  placeholder="0.0.0.0"/>
                    </label>
                    <label>
                        Target Host[s]
                        <br></br>
                        <input type="text" name="node-host" defaultValue={node.targetHostList} onKeyUp={() => {setNodeHost(document.querySelector('input[name="node-host"]').value)}} placeholder="0.0.0.0, 0.0.0.1"/>
                    </label>
                    <label>
                        Description
                        <br></br>
                        <input type="text" name="node-description" defaultValue={node.description} onKeyUp={() => {setNodeDescription(document.querySelector('input[name="node-description"]').value)}}/>
                    </label>
                    <label>
                        Auto Edit Edges
                        <br></br>
                        <input type="checkbox" name="node-auto" defaultChecked={node.isMalformed} onChange={() => {setNodeAuto(!nodeAuto)}}/>
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