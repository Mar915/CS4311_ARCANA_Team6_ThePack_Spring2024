import React, { useState, useEffect} from 'react';
import "./CreateNodePage.css"
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';

const CreateNodePage = ({ open, onClose, eventList, setEventList, setList, project, setFetchEvents, setNodes }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [nodeDate, setNodeDate] = useState('');
    const [nodeTime, setNodeTime] = useState('');
    const [nodeInitials, setNodeInitials] = useState('');
    const [nodeTeam, setNodeTeam] = useState('White');
    const [nodePosture, setNodePosture] = useState('');
    const [nodeLocation, setNodeLocation] = useState('');
    const [nodeVector, setNodeVector] = useState('');
    const [nodeSource, setNodeSource] = useState('');
    const [nodeHost, setNodeHost] = useState('');
    const [nodeDescription, setNodeDescription] = useState('');
    const [nodeIcon, setNodeIcon] = useState('White');
    const [nodeAuto, setNodeAuto] = useState(false)

    // [TO-DO]
    const createNode = async (event) => {
        event.preventDefault()

        const parsedHost = nodeHost.split(",").map((host) =>host.trim())
        console.log(nodeIcon)
        const icon = `default_${nodeIcon.toLowerCase()}`
        
        const eventData = {
            timestamp: nodeDate + " " + nodeTime, initials: nodeInitials, team: nodeTeam, posture: nodePosture,
            location: nodeLocation, vectorID: nodeVector, sourceHost: nodeSource, targetHostList: parsedHost,
            description: nodeDescription, icon: icon, isMalformed: nodeAuto, dataSource: "User Created"
        }

        const data = {
            eventData, project
        }
        try {
            console.log(data)
            await axios.post('http://127.0.0.1:5000/createEvent', data)
            // setNodeSource(prev => (
            //     [...prev,nodeData]
            // ))
            // needed this for the created node to display the info for 'ReactFlow'
            const newNode = {
                id: (eventList.length + 1).toString(),
                position: { x: 0, y: 0 },
                data: {
                    label:
                        `${eventData.team} Team Activity\nTime: ${eventData.timestamp}\nLocation: ${eventData.location}`, eventData: eventData
                },
                height: 85,
                width: 150 
            }
            setEventList(prev => [...prev, newNode])
            setList(prev => [...prev, newNode])
            setNodes(prev => [...prev, newNode])
            setNodeDate("");
            setNodeTime("");
            setNodeInitials("");
            setNodeTeam("");
            setNodePosture("");
            setNodeLocation("");
            setNodeVector("");
            setNodeSource("");
            setNodeHost("");
            setNodeDescription("");
            setNodeIcon("");
            setNodeAuto(false);
            setShowSuccess(true);
            setFetchEvents(true)
        }
        catch (error) {
            console.log("FAIL")
            setShowFail(true);

        }
    };

    if (!open) {
        return null
    }

    const closeMessage = () =>{
        setShowFail(false)
        setShowSuccess(false)
    }


    return (
        <div className="create-node-overlay">
            <div className="create-node-modal">
                <h1>Create Node</h1>
                <p className="close-button-create-node" onClick={onClose}>X</p>
                <form className= "create-node-form" onSubmit= {(node) => { createNode(node)}}>
                    <label>
                        Date
                        <br></br>
                        <input type="date" name="node-date" onChange={() => { setNodeDate(document.querySelector('input[name="node-date"]').value)}} />
                    </label>
                    <br></br>
                    <label>
                        Time
                        <br></br>
                        <input type="time" name="node-time" onChange={() => { setNodeTime(document.querySelector('input[name="node-time"]').value) }} placeholder='hh:mm:ss' />
                    </label>
                    <br></br>
                    <label>
                        Initials<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="node-initials" required onKeyUp={() => { setNodeInitials(document.querySelector('input[name="node-initials"]').value) }} placeholder="III" />
                    </label>
                    <br></br>
                    <label>
                        Team<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <select name="node-team" required value={nodeTeam} onChange={(team) => { setNodeTeam(team.target.value) }}>
                            <option className="node-white" value="White">White</option>
                            <option className="node-red" value="Red">Red</option>
                            <option className="node-blue" value="Blue">Blue</option>
                        </select>
                    </label>
                    <br></br>
                    <label>
                        TOA Icon<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <select name="node-icon" required value={nodeIcon} onChange={(icon) => { setNodeIcon(icon.target.value) }}>
                            <option className="node-white" value="White">White</option>
                            <option className="node-red" value="Red">Red</option>
                            <option className="node-blue" value="Blue">Blue</option>
                            <option className="node-detect" value="Detect">Detect</option>
                            <option className="node-protect" value="Protect">Protect</option>
                            <option className="node-react" value="React">React</option>
                            <option className="node-restore" value="Restore">Restore</option>
                        </select>
                    </label>
                    <br></br>
                    <label>
                        Posture
                        <br></br>
                        <input type="text" name="node-posture" onKeyUp={() => { setNodePosture(document.querySelector('input[name="node-posture"]').value) }} />
                    </label>
                    <br></br>
                    <label>
                        Location
                        <br></br>
                        <input type="text" name="node-location" onKeyUp={() => { setNodeLocation(document.querySelector('input[name="node-location"]').value) }} />
                    </label>
                    <br></br>
                    <label>
                        Vector ID
                        <br></br>
                        <input type="text" name="node-vector" onKeyUp={() => { setNodeVector(document.querySelector('input[name="node-vector"]').value) }} />
                    </label>
                    <br></br>
                    <label>
                        Source Host
                        <br></br>
                        <input type="text" name="node-source" onKeyUp={() => { setNodeSource(document.querySelector('input[name="node-source"]').value) }} placeholder="0.0.0.0" />
                    </label>
                    <br></br>
                    <label>
                        Target Host[s]
                        <br></br>
                        <input type="text" name="node-host" onKeyUp={() => { setNodeHost(document.querySelector('input[name="node-host"]').value) }} placeholder="0.0.0.0, 0.0.0.1" />
                    </label>
                    <br></br>
                    <label>
                        Description<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="node-description" onKeyUp={() => { setNodeDescription(document.querySelector('input[name="node-description"]').value) }} />
                    </label>
                    <br></br>
                    <label>
                        Auto Create Edges
                        <br></br>
                        <input type="checkbox" name="node-auto" checked={nodeAuto} onChange={() => { setNodeAuto(!nodeAuto) }} />
                    </label>
                    <br></br>
                    <button className= "cancel-node-button" onClick={onClose}>Cancel</button>
                    <input type="submit" value="Create Node" className="create-node-confirm-button" />
                    <br></br>
                    <br></br>
                    {(showSuccess && (
                        <SuccessMessage
                            message={'Success: Node was created'}
                            onClose={closeMessage}
                        />)) || (showFail && (
                            <FailMessage
                                message={'Error: Unable to create node'}
                                onClose={closeMessage}
                            />
                            
                        ))}
                </form>
            </div>
        </div>
    )
}

export default CreateNodePage