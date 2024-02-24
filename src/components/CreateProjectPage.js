import React, { useState } from 'react';
import './CreateProjectPage.css';

const CreateProjectPage = ({ open, onClose }) => {
    if (!open) {
        return null
    }

    return (
        <div className="create-proj-overlay">
            <div className="create-proj-modal">
                <h1>Create Project</h1>
                <p className="close-button" onClick={onClose}>X</p>
                <form className="create-proj-form">
                    <label>
                        Project Name<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="proj-name" required/>
                    </label>
                    <br></br>
                    <label>
                        Project Location<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="proj-location" required />
                    </label>
                    <div>
                    <label>
                        Start Date<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="date" name="proj-start-date" required />
                    </label>
                    <br></br>
                    <label>
                        End Date<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="date" name="proj-end-date" required />
                    </label>
                    </div>
                    <label>
                        Initials<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="proj-initials" required />
                    </label>
                    <br></br>
                    <button className="cancel-proj-button" onClick={onClose}>Cancel</button>
                    <input type="submit" value="Create Project" className="create-proj-confirm-button"/>
                </form>
            </div>
        </div>
    );
}

export default CreateProjectPage;