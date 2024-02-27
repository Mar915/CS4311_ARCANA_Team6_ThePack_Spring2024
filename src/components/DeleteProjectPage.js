import React, { useState } from 'react';
import './DeleteProjectPage.css';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';
// [TO DO]: Change project to project.projName
const DeleteProjectPage = ({ open, onClose, project }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    if (!open) {
        return null
    }

    const deleteProject = async (event) => {
        try {
            event.preventDefault()
            // Attempting use axios.delete
            await axios.post(`http://localhost:5000/deleteProject`, project)
            console.log(project)
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
        <div className="delete-proj-overlay">
            <div className="delete-proj-modal">
                <p>Are you sure you want to delete {project.projName}?</p>
                <p className="close-button-delete-proj" onClick={onClose}>X</p>
                {(showSuccess && (
                <SuccessMessage
                  message={'Success: Project was deleted'}
                  onClose={closeMessage}
                />)) || (showFail && (
                    <FailMessage
                      message={'Error: Unable to delete project'}
                      onClose={closeMessage}
                    />
                  ))}
                <button className="cancel-delete-proj-button" onClick={onClose}>Cancel</button>
                <button className="confirm-delete-proj-button" onClick={(event) => {deleteProject(event)}}>Delete</button>
            </div>
        </div>
    );
}

export default DeleteProjectPage;