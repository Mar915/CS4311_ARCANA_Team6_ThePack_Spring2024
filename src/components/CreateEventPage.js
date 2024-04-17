import React, { useState } from 'react';
import './CreateEventPage.css';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';


const CreateEventPage = ({ open, onClose, project, setEvents, setFetchEvents }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventInitials, setEventInitials] = useState('');
    const [eventTeam, setEventTeam] = useState('White');
    const [eventPosture, setEventPosture] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventVector, setEventVector] = useState('');
    const [eventSource, setEventSource] = useState('');
    const [eventHost, setEventHost] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventAuto, setEventAuto] = useState(false)
    const [nodeIcon, setNodeIcon] = useState('White')

    const createEvent = async (event) => {
        event.preventDefault()

        const parsedHost = eventHost.split(",").map((host) => host.trim())
        const icon = `default_${nodeIcon.toLowerCase()}`

        console.log(icon)

        const eventData = {
            timestamp: eventDate + " " + eventTime, initials: eventInitials, team: eventTeam, posture: eventPosture, icon: nodeIcon, location: eventLocation, vectorID: eventVector, sourceHost: eventSource, targetHostList: parsedHost, description: eventDescription, isMalformed: eventAuto, dataSource: "User Created"
        }
        const data = {
             project, eventData
        }

        //console.log(data)

        try {
            // [TO DO]: Change to how event function is actually set up
            console.log(data)
            await axios.post('http://127.0.0.1:5000/createEvent', data)
            // setEvents(prev => (
            //     [...prev, eventData]
            // ))
            //console.log(data)
            setEventDate("");
            setEventTime("");
            setEventInitials("");
            setEventTeam("");
            setEventPosture("");
            setEventLocation("");
            setEventVector("");
            setEventSource("");
            setEventHost("");
            setEventDescription("");
            setEventAuto(false);
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

    const closeMessage = () => {
        setShowFail(false)
        setShowSuccess(false)
    }

    return (
        <div className="create-event-overlay">
            <div className="create-event-modal">
                <h1>Create Event</h1>
                <p className="close-button-create-event" onClick={onClose}>X</p>
                <form className="create-event-form" onSubmit={(event) => { createEvent(event) }}>
                    <label>
                        Date
                        <br></br>
                        <input type="date" name="event-date" onChange={() => { setEventDate(document.querySelector('input[name="event-date"]').value) }} />
                    </label>
                    <br></br>
                    <label>
                        Time
                        <br></br>
                        <input type="time" name="event-time" onChange={() => { setEventTime(document.querySelector('input[name="event-time"]').value) }} placeholder='hh:mm:ss' />
                    </label>
                    <label>
                        Initials<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="event-initials" required onKeyUp={() => { setEventInitials(document.querySelector('input[name="event-initials"]').value) }} placeholder="III" />
                    </label>
                    <br></br>
                    <label>
                        Team<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <select name="event-team" required value={eventTeam} onChange={(team) => { setEventTeam(team.target.value) }}>
                            <option className="event-white" value="White">White</option>
                            <option className="event-red" value="Red">Red</option>
                            <option className="event-blue" value="Blue">Blue</option>
                        </select>
                    </label>
                    <label>
                        TOA Icon<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <select name="node-icon" required value={nodeIcon} onChange={(icon) => { setNodeIcon(icon.target.value) }}>
                            <option className="node-white" value="default_white">White</option>
                            <option className="node-red" value="default_red">Red</option>
                            <option className="node-blue" value="default_blue">Blue</option>
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
                        <input type="text" name="event-posture" onKeyUp={() => { setEventPosture(document.querySelector('input[name="event-posture"]').value) }} />
                    </label>
                    <label>
                        Location
                        <br></br>
                        <input type="text" name="event-location" onKeyUp={() => { setEventLocation(document.querySelector('input[name="event-location"]').value) }} />
                    </label>
                    <label>
                        Vector ID
                        <br></br>
                        <input type="text" name="event-vector" onKeyUp={() => { setEventVector(document.querySelector('input[name="event-vector"]').value) }} />
                    </label>
                    <label>
                        Source Host
                        <br></br>
                        <input type="text" name="event-source" onKeyUp={() => { setEventSource(document.querySelector('input[name="event-source"]').value) }} placeholder="0.0.0.0" />
                    </label>
                    <label>
                        Target Host[s]
                        <br></br>
                        <input type="text" name="event-host" onKeyUp={() => { setEventHost(document.querySelector('input[name="event-host"]').value) }} placeholder="0.0.0.0, 0.0.0.1" />
                    </label>
                    <label>
                        Description<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="event-description" required onKeyUp={() => { setEventDescription(document.querySelector('input[name="event-description"]').value) }} />
                    </label>
                    {/* [TO DO]: Add Icon Selector */}
                    <label>
                        Auto Create Edges
                        <br></br>
                        <input type="checkbox" name="event-auto" checked={eventAuto} onChange={() => { setEventAuto(!eventAuto) }} />
                    </label>
                    <br></br>
                    <button className="cancel-event-button" onClick={onClose}>Cancel</button>
                    <input type="submit" value="Create Event" className="create-event-confirm-button" />
                    {(showSuccess && (
                        <SuccessMessage
                            message={'Success: Event was created'}
                            onClose={closeMessage}
                        />)) || (showFail && (
                            <FailMessage
                                message={'Error: Unable to create Event'}
                                onClose={closeMessage}
                            />
                        ))}
                </form>

            </div>
        </div>


    )
}


export default CreateEventPage;