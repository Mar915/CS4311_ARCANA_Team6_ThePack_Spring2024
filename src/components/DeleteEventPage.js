import React, { useState } from 'react';
import './DeleteEventPage.css';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';
// [TO DO]: Change project to project.eventName
const DeleteEventPage = ({ open, onClose, project }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    if (!open) {
        return null
    }

    const deleteEvent = async (event) => {
        try {
            event.preventDefault()
            // Attempting use axios.delete
            await axios.post(`http://localhost:5000/deleteEvent`, event)
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
                <p>Are you sure you want to delete the event lol? {project.eventName}?</p>
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