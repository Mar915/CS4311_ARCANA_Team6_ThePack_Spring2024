import React, { useState, useEffect } from 'react';
import './ManageEventPage.css';
import CreateProjectPage from './CreateProjectPage';
import EditEvent from './EditEventPage';
import DeleteProjectPage from './DeleteProjectPage';
import FailMessage from './FailMessage';
import axios from 'axios';

function ManageEventPage({ navigateTo }) {
    const [openModalCreate, setOpenCreateModal] = useState(false)
    const [openModalIngest, setOpenIngestModal] = useState(false)
    const [openModalDelete, setOpenDeleteModal] = useState(false)
    const [showFail, setShowFail] = useState(false)
    //const [events, setEvents] = useState([])
    const [events, setEvents] = useState([
        {
            malformed: 'Yes',
            timestamp: '2024-03-04 14:30:00',
            initials: 'ML',
            team: 'Red',
            posture: 'Alert',
            description: 'Malware detected',
            location: 'Office',
            source_host: '192.168.1.100',
            target_host: '192.168.2.200',
            vector_id: '12345',
            data_source: 'Firewall'
        },
        {
            malformed: 'No',
            timestamp: '2024-03-04 12:15:00',
            initials: 'VO',
            team: 'Blue',
            posture: 'Warning',
            description: 'Suspicious activity detected',
            location: 'Data Center',
            source_host: '192.168.3.150',
            target_host: '192.168.4.220',
            vector_id: '67890',
            data_source: 'IDS'
        },
        {
            malformed: 'Yes',
            timestamp: '2024-03-04 10:00:00',
            initials: 'DP',
            team: 'White',
            posture: 'Info',
            description: 'System update completed',
            location: 'Remote',
            source_host: '192.168.5.80',
            target_host: '192.168.6.40',
            vector_id: '54321',
            data_source: 'Server Logs'
        }
    ]);
    const [selectEvent, setSelectEvent] = useState(null)
    
    useEffect(() => {
        const displayEvent = async () => {
            try {
                // TO DO: change this fetch to a post that gives the backend the project name
                const response = await fetch('http://localhost:5000/openProject');
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
        displayEvent();
    }, [])

    const closeMessage = () => {
        setShowFail(false)
    } 

    const selectRowEvent = (event) => {
        console.log(event)
        setSelectEvent(event)
    }



    return (
        <div className="manage-Event-page"> 
            <div className="proj-header-container">
            <h1 className="proj-header">Manage Events</h1>
            </div>
            <button className="create-proj-button" onClick={() => setOpenCreateModal((true))}>+ Create Event</button>
            <CreateProjectPage open={openModalCreate} onClose={() => setOpenCreateModal(false)}></CreateProjectPage>
            <div className="proj-list-container">
            <table className="proj-list">
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
                        </tr>
                    </thead>
                    <tbody>
                    {events.map((event, index) => (
                            <tr key={index} className={selectEvent === event ? 'selected' : ''} onClick={() => selectRowEvent(event)}>
                                <td>{event.malformed}</td>
                                <td>{event.timestamp}</td>
                                <td>{event.initials}</td>
                                <td>{event.team}</td>
                                <td>{event.posture}</td>
                                <td>{event.description}</td>
                                <td>{event.location}</td>
                                <td>{event.source_host}</td>
                                <td>{event.target_host}</td>
                                <td>{event.vector_id}</td>
                                <td>{event.data_source}</td>
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
            <div className="proj-option-buttons">
                <button className="inject-proj-button" onClick={() => setOpenIngestModal((true))}>Update Events</button>
                <EditEvent open={openModalIngest} onClose={() => setOpenIngestModal(false)} project={selectEvent}></EditEvent>
                <button className="delete-proj-button" onClick={() => setOpenDeleteModal((true))}>Delete Event</button>
                <DeleteProjectPage open={openModalDelete} onClose={() => setOpenDeleteModal(false)} project={selectEvent}></DeleteProjectPage>
            </div>
        </div>
    );
}

export default ManageEventPage;