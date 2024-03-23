import React, { useState } from 'react';
import './CreateProjectPage.css';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';

const CreateProjectPage = ({ open, onClose, setProjects }) => {
    const [projName, setProjName] = useState('');
    const [projLocation, setProjLocation] = useState('');
    const [projStartDate, setProjStDate] = useState('');
    const [projEndDate, setProjEdDate] = useState('');
    const [projInitials, setProjInitials] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    if (!open) {
        return null
    }

    const createProject = async (event) => {
        event.preventDefault()
        const data = {
            projName, projLocation, projStartDate, projEndDate, projInitials,
        }

        // [TO DO]: ADD VALIDATION (no same name, etc.) 

        try {
            setProjects(prev => (
                [...prev, data]
            ))
            await axios.post('http://127.0.0.1:5000/createProject', data)
            console.log(data)
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
        <div className="create-proj-overlay">
            <div className="create-proj-modal">
                <h1>Create Project</h1>
                <p className="close-button-create-proj" onClick={onClose}>X</p>
                <form className="create-proj-form" onSubmit={(event) => {createProject(event)}}>
                    <label>
                        Project Name<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="proj-name" required onKeyUp={() => {setProjName(document.querySelector('input[name="proj-name"]').value)}} />
                    </label>
                    <br></br>
                    <label>
                        Project Location<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="proj-location" required onKeyUp={() => {setProjLocation(document.querySelector('input[name="proj-location"]').value)}} />
                    </label>
                    <div>
                    <label>
                        Start Date<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="date" name="proj-start-date" required onChange={() => {setProjStDate(document.querySelector('input[name="proj-start-date"]').value)}}/>
                    </label>
                    <br></br>
                    <label>
                        End Date<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="date" name="proj-end-date" required onChange={() => {setProjEdDate(document.querySelector('input[name="proj-end-date"]').value)}}/>
                    </label>
                    </div>
                    <label>
                        Initials<span className="asterisk">* </span><span className="required">(required)</span>
                        <br></br>
                        <input type="text" name="proj-initials" required onKeyUp={() => {setProjInitials(document.querySelector('input[name="proj-initials"]').value)}}/>
                    </label>
                    <br></br>
                    <button className="cancel-proj-button" onClick={onClose}>Cancel</button>
                    <input type="submit" value="Create Project" className="create-proj-confirm-button"/>
                    {(showSuccess && (
                <SuccessMessage
                  message={'Success: Project was created'}
                  onClose={closeMessage}
                />)) || (showFail && (
                    <FailMessage
                      message={'Error: Unable to create project'}
                      onClose={closeMessage}
                    />
                  ))}
                </form>
                
            </div>
        </div>
    );
}

export default CreateProjectPage;