import React, { useState } from 'react';
import './DeleteProjectPage.css';
// [TO DO]: Change project to project.projName
const DeleteProjectPage = ({ open, onClose, project }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    if (!open) {
        return null
    }

    return (
        <div className="delete-proj-overlay">
            <div className="delete-proj-modal">
                <p>Are you sure you want to delete {project}?</p>
                <p className="close-button-delete-proj" onClick={onClose}>X</p>
                <button className="cancel-delete-proj-button" onClick={onClose}>Cancel</button>
                <button className="confirm-delete-proj-button">Delete</button>

            </div>
        </div>
    );
}

export default DeleteProjectPage;