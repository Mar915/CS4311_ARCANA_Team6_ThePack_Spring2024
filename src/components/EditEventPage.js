import React, { useState } from 'react';
import './EditEventPage.css';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';

const EditEventPage = ({ open, onClose, project, currEvent}) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventInitials, setEventInitials] = useState('');
    const [eventTeam, setEventTeam] = useState('');
    const [eventPosture, setEventPosture] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventVector, setEventVector] = useState('');
    const [eventSource, setEventSource] = useState('');
    const [eventHost, setEventHost] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventAuto, setEventAuto] = useState('')
    const [nodeIcon, setNodeTeam] = useState('')

    const editEvent = async (event) => {
        event.preventDefault()
        // console.log("Project: ", project)
        console.log("Event: ", currEvent)


        const parsedHost = eventHost.split(",").map((host) => host.trim())

        const icon = `default_${nodeIcon.toLowerCase()}.png`

        const data = {
            eventDate, eventTime, eventInitials, eventTeam, eventPosture, eventLocation, eventVector, eventSource, parsedHost, icon, eventDescription, eventAuto, project
        }

        // Data source can't be edited so we need to pass it to edited event
        const ds = currEvent.dataSource
        // Timestamp is concatenated so we have to ensure that it will stay that way
        let ts = ""
        if (eventDate === "" && eventTime === "") {
            ts = currEvent.timestamp
        }
        else if (eventDate === "" && eventTime !== "") {
            ts = currEvent.timestamp.split(" ")[0]+ " " + eventTime
        }
        else if (eventDate !== "" && eventTime === "") {
            ts = eventDate + " " + currEvent.timestamp.split(" ")[1]
        }
        const eventData = {
            timestamp: ts, initials: eventInitials, team: eventTeam, posture: eventPosture, icon: icon, location: eventLocation, vectorID: eventVector, sourceHost: eventSource, targetHostList: eventHost, description: eventDescription, isMalformed: eventAuto, dataSource: ds
        }
        // console.log(data)
        // console.log(eventData)
        // console.log(eventInitials)

        try {
            // [TO DO]: Change to how event function is actually set up
            await axios.post('http://127.0.0.1:5000/updateEvent', data)
/*                setEvents(prev => (
                    // Iterate through event list
                    prev.map((p) => {
                        // Only edit event that matches currEvent
                        if (p.vectorID === currEvent.vectorID) {
                            // Traverse eventData and track non-null values and updated them in copy of currEvent 
                            const updatedEvent = Object.keys(eventData).reduce((acc, i) => {
                                if (eventData[i] !== null && eventData[i] !== undefined && eventData[i] !== "") {
                                    acc[i] = eventData[i]
                                }
                                return acc
                            }, {...currEvent}) 
                            return updatedEvent
                        }
                        return {...p}
                    })
                )) */
            console.log(data)
            //console.log(data)
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
        <div className="edit-event-overlay">
            <div className="edit-event-modal">
                <h1>Edit Event</h1>
                <p className="close-button-edit-event" onClick={onClose}>X</p>
                <form className="edit-event-form" onSubmit={(event) => {editEvent(event)}}>
                    <label>
                        Date
                        <br></br>
                        <input type="date" name="event-date" defaultValue={currEvent.timestamp.split(" ")[0]} onChange={() => {setEventDate(document.querySelector('input[name="event-date"]').value)}} />
                    </label>
                    <br></br>
                    <label>
                        Time
                        <br></br>
                        <input type="time" name="event-time" defaultValue={currEvent.timestamp.split(" ")[1]} onChange={() => {setEventTime(document.querySelector('input[name="event-time"]').value)}} placeholder='hh:mm:ss'/>
                    </label>
                    <label>
                        Initials<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="event-initials" defaultValue={currEvent.initials} onKeyUp={() => {setEventInitials(document.querySelector('input[name="event-initials"]').value)}} placeholder="III"/>
                    </label>
                    <br></br>
                    <label>
                        Team<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <select name="event-team" defaultValue={currEvent.team} onChange={(team) => {setEventTeam(team.target.value)}}>
                            <option className="event-white" value="White">White</option>
                            <option className="event-red" value="Red">Red</option>
                            <option className="event-blue" value="Blue">Blue</option>
                        </select>
                    </label>
                    <label>
                        TOA Icon<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <select name="node-icon" required defaultValue={currEvent.icon.split("_")[1].split(".")[0].charAt(0).toUpperCase() + currEvent.icon.split("_")[1].split(".")[0].slice(1)} onChange={(icon) => { setNodeTeam(icon.target.value) }}>
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
                        <input type="text" name="event-posture" defaultValue={currEvent.posture} onKeyUp={() => {setEventPosture(document.querySelector('input[name="event-posture"]').value)}}/>
                    </label>
                    <label>
                        Location
                        <br></br>
                        <input type="text" name="event-location" defaultValue={currEvent.location} onKeyUp={() => {setEventLocation(document.querySelector('input[name="event-location"]').value)}}/>
                    </label>
                    <label>
                        Vector ID
                        <br></br>
                        <input type="text" name="event-vector" defaultValue={currEvent.vectorID} onKeyUp={() => {setEventVector(document.querySelector('input[name="event-vector"]').value)}}/>
                    </label>
                    <label>
                        Source Host
                        <br></br>
                        <input type="text" name="event-source" defaultValue={currEvent.sourceHost} onKeyUp={() => {setEventSource(document.querySelector('input[name="event-source"]').value)}}  placeholder="0.0.0.0"/>
                    </label>
                    <label>
                        Target Host[s]
                        <br></br>
                        <input type="text" name="event-host" defaultValue={currEvent.targetHostList} onKeyUp={() => {setEventHost(document.querySelector('input[name="event-host"]').value)}} placeholder="0.0.0.0, 0.0.0.1"/>
                    </label>
                    <label>
                        Description<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="event-description" defaultValue={currEvent.description} onKeyUp={() => {setEventDescription(document.querySelector('input[name="event-description"]').value)}}/>
                    </label>
                    {/* [TO DO]: Add Icon Selector */}
                    <label>
                        Auto Edit Edges
                        <br></br>
                        <input type="checkbox" name="event-auto" defaultChecked={currEvent.isMalformed} onChange={() => {setEventAuto(!eventAuto)}}/>
                    </label>
                    <br></br>
                    <button className="cancel-event-button" onClick={onClose}>Cancel</button>
                    <input type="submit" value="Edit Event" className="edit-event-confirm-button"/>
                    {(showSuccess && (
                <SuccessMessage
                  message={'Success: Event was edited'}
                  onClose={closeMessage}
                />)) || (showFail && (
                    <FailMessage
                      message={'Error: Unable to edit Event'}
                      onClose={closeMessage}
                    />
                  ))}
                </form>
                
            </div>
        </div>


    )
}


export default EditEventPage;