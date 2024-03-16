import React, { useState } from 'react';
import './DeleteEventPage.css';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';
// [TO DO]: Change project to project.eventName
const DeleteEventPage = ({ open, onClose, project, currEvent }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    if (!open) {
        return null
    }

    const data = {project, currEvent}

    const deleteEvent = async (event) => {
        try {
            event.preventDefault()
            // Attempting use axios.delete
            await axios.post(`http://127.0.0.1:5000/deleteEvent`, data)
            //console.log(event.eventName)
            setShowSuccess(true);
        } 
        catch (error) {
            console.log("FAIL")
            setShowFail(true);
        }
    };

  const closeMessage = () => {
        setShowFail(false)
        setShowSuccess(false)
    } 

    return (
        <div className="delete-event-overlay">
            <div className="delete-event-modal">
                <p>Are you sure you want to delete the event {currEvent.id}?</p>
                <p className="close-button-delete-event" onClick={onClose}>X</p>
                {(showSuccess && (
                <SuccessMessage
                  message={'Success: Event was deleted'}
                  onClose={closeMessage}
                />)) || (showFail && (
                    <FailMessage
                      message={'Error: Unable to delete event'}
                      onClose={closeMessage}
                    />
                  ))}
                <button className="cancel-delete-event-button" onClick={onClose}>Cancel</button>
                <button className="confirm-delete-event-button" onClick={(event) => {deleteEvent(event)}}>Delete</button>
            </div>
        </div>
    );
};

export default DeleteEventPage;