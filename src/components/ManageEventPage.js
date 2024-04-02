import React, { useState, useEffect } from 'react';
import './ManageEventPage.css';
import CreateEventPage from './CreateEventPage';
import EditEventPage from './EditEventPage';
import DeleteEventPage from './DeleteEventPage';
import FailMessage from './FailMessage';

function ManageEventPage({ navigateTo, project }) {
    const [fetchEvents, setFetchEvents] = useState(true)
    const [openModalCreate, setOpenCreateModal] = useState(false)
    const [openModalIngest, setOpenIngestModal] = useState(false)
    const [openModalDelete, setOpenDeleteModal] = useState(false)
    const [showFail, setShowFail] = useState(false)
    const [events, setEvents] = useState([
        {
            isMalformed: 'Yes',
            timestamp: '2024-03-04 14:30:00',
            initials: 'ML',
            team: 'Red',
            posture: 'Alert',
            description: 'Malware detected',
            location: 'Office',
            sourceHost: '192.168.1.100',
            targetHostList: '192.168.2.200',
            vectorID: '12345',
            dataSource: 'Firewall',
            icon: 'default_red'
        },
        {
            isMalformed: 'No',
            timestamp: '2024-03-04 12:15:00',
            initials: 'VO',
            team: 'Blue',
            posture: 'Warning',
            description: 'Suspicious activity detected',
            location: 'Data Center',
            sourceHost: '192.168.3.150',
            targetHostList: '192.168.4.220',
            vectorID: '67890',
            dataSource: 'IDS',
            icon: 'default_blue'
        },
        {
            isMalformed: 'Yes',
            timestamp: '2024-03-04 10:00:00',
            initials: 'DP',
            team: 'White',
            posture: 'Info',
            description: 'System update completed',
            location: 'Remote',
            sourceHost: '192.168.5.80',
            targetHostList: '192.168.6.40',
            vectorID: '54321',
            dataSource: 'Server Logs',
            icon: 'default_white'
        }
    ]);
    const [selectEvent, setSelectEvent] = useState(null)

    useEffect(() => {
        if (fetchEvents) {
            const displayEvent = async () => {
                try {
                    // TO DO: change this fetch to a post that gives the backend the project name
                    const response = await fetch('http://127.0.0.1:5000/openProject', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(project),
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setEvents(data)
                        // console.log(data)
                    }
                    else {
                        // console.log("FAIL")
                        setShowFail(true);
                    }
                }
                catch (e) {
                    // console.log("FAIL")
                    // console.log(data)        //verifying fetch actually failed
                    // console.error('Error:', e);  //added so I can see exactly what the issue is
                    setShowFail(true);
                }
            }
            displayEvent()
            setFetchEvents(false)
        }
    }, [fetchEvents])

    const closeMessage = () => {
        setShowFail(false)
    }

    const selectRowEvent = (event) => {
        console.log(event)
        console.log(project)
        setSelectEvent(event)
    }

    return (
        <div className="manage-event-page">
            <div className="event-header-container">
                <h1 className="event-header">Manage Events</h1>
            </div>
            <button className="create-event-button" onClick={() => setOpenCreateModal((true))}>+ Create Event</button>
            <CreateEventPage open={openModalCreate} onClose={() => setOpenCreateModal(false)} project={project} setEvents={setEvents} setFetchEvents={setFetchEvents}></CreateEventPage>
            <div className="event-list-container">
                <table className="event-list">
                    <thead>
                        <tr>
                            <th>Malformed</th>
                            <th>Timestamp</th>
                            <th>Initials</th>
                            <th>Team</th>
                            <th>Posture</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Source Host</th>
                            <th>Target Host</th>
                            <th>Vector ID</th>
                            <th>Data Source</th>
                            <th>TOA Icon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <tr key={index} className={`event-li ${selectEvent === event ? 'selected' : ''}`} onClick={() => selectRowEvent(event)}>
                                <td>{event.isMalformed === true ? "Yes" : event.isMalformed === false ? "No" : event.isMalformed}</td>
                                <td>{event.timestamp}</td>
                                <td>{event.initials}</td>
                                <td>{event.team}</td>
                                <td>{event.posture}</td>
                                <td>{event.description}</td>
                                <td>{event.location}</td>
                                <td>{event.sourceHost}</td>
                                <td>{event.targetHostList}</td>
                                <td>{event.vectorID}</td>
                                <td>{event.dataSource}</td>
                                <td><img src={`/Icons/${event.icon.toLowerCase()}.png`} height={83} width={87} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showFail && (
                    <FailMessage
                        message={'Error: Unable to load Events'}
                        onClose={closeMessage}
                    />
                )}
            </div>
            <div className="event-option-buttons">
                <button className="inject-event-button" onClick={() => setOpenIngestModal((true))}>Update Events</button>
                {selectEvent !== null && <EditEventPage open={openModalIngest} onClose={() => setOpenIngestModal(false)} project={project} currEvent={selectEvent} setEvents={setEvents} setFetchEvents={setFetchEvents}></EditEventPage>}
                <button className="delete-event-button" onClick={() => setOpenDeleteModal((true))}>Delete Event</button>
                {selectEvent !== null && <DeleteEventPage open={openModalDelete} onClose={() => setOpenDeleteModal(false)} project={project} currEvent={selectEvent} setEvents={setEvents} setFetchEvents={setFetchEvents}></DeleteEventPage>}
                <button className="graph-event-button" onClick={() => navigateTo('manageGraphPage', project, events)}>Event Graph</button>
            </div>
        </div>
    );
}

export default ManageEventPage;