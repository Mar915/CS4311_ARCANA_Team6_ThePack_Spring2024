import React, { useState } from 'react';
import './DeleteProjectPage.css';

const DeleteProjectPage = ({ open, onClose }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    if (!open) {
        return null
    }

    return (
        <div className="delete-proj-overlay">
            <div className="delete-proj-modal">
                <p>Are you sure you want to delete Project D?</p>
                <p className="close-button-delete-proj" onClick={onClose}>X</p>
                <button className="cancel-delete-proj-button" onClick={onClose}>Cancel</button>
                <button className="confirm-delete-proj-button">Delete</button>

            </div>
        </div>
    );
}

export default DeleteProjectPage;