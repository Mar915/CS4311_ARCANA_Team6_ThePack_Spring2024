import React, { useState, useEffect} from 'react';
import "./CreateNodePage.css"
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';

const CreateNodePage = ({ open, onClose, project, setFetchEvents }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [nodeDate, setNodeDate] = useState('');
    const [nodeTime, setNodeTime] = useState('');
    const [nodeInitials, setNodeInitials] = useState('');
    const [nodeTeam, setNodeTeam] = useState('');
    const [nodePosture, setNodePosture] = useState('');
    const [nodeLocation, setNodeLocation] = useState('');
    const [nodeVector, setNodeVector] = useState('');
    const [nodeSource, setNodeSource] = useState('');
    const [nodeHost, setNodeHost] = useState('');
    const [nodeDescription, setNodeDescription] = useState('');
    const [nodeIcon, setNodeIcon] = useState('');
    const [nodeAuto, setNodeAuto] = useState(false);
    const [iconNames, setIconNames] = useState([]);

    useEffect(() => {
        // Fetch icon filenames or paths from a server-side endpoint
        axios.get('http://example.com/icons')
            .then(response => {
                setIconNames(response.data);
            })
            .catch(error => {
                console.error('Error fetching icon filenames:', error);
            });
    }, []);


    const createNode = async (node) => {
        node.preventDefault()

        const parsedHost = nodeHost.split(",").map((host) =>host.trim())

        
        const eventData = {
            timestamp: nodeDate + " " + nodeTime, initials: nodeInitials, team: nodeTeam, posture: nodePosture,
            location: nodeLocation, vectorID: nodeVector, sourceHost: nodeSource, targetHostList: parsedHost,
            description: nodeDescription, icon: nodeIcon, isMalformed: nodeAuto, dataSource: "User Created"
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
            setEventList(prev => (
                prev.filter(p => p.id !== node.id)
            ))
            setList(prev => (
                prev.filter(p => p.id !== node.id)
            ))
            setNodes(prev => (
                prev.filter(p => p.id !== node.id)
            ))
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
                        <br />
                        {/* <select name="node-icon" required value={nodeIcon} onChange={(icon) => { setNodeIcon(icon.target.value) }}>
                            {iconNames.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select> */}
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