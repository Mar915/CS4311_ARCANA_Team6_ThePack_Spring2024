import React, { useState } from 'react';
import './Create_TOA.css';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';
// [TO DO]: Change project to project.eventName
const CreateTOAPage = ({ open, onClose, project}) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [TeamType, setTeamType] = useState('');
    const [ActionTitle, setActionTitle] = useState('');
    const [IconUpload, setIconUpload] = useState('');

    const CreateTOA = async (TOA) => {
        TOA.preventDefault()
        const TOAData = {
            team: TeamType, title: ActionTitle, icon: IconUpload 
        }
        const data = {
            project, TOAData
        }

        try {
            console.log(data)
            await axios.post('http://127.0.0.1:5000/createTOA', data)
            setTeamType("");
            setActionTitle("");
            setIconUpload("");
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
        <div className="create-toa-overlay">
            <div className="create-toa-modal">
                <h1>Create TOA Icon</h1>
                <p className="close-button-create-toa" onClick={onClose}>X</p>
                <form className="create-toa-form" onSubmit={(TOA) => { CreateTOA(TOA) }}>
                    <div class="dropdown">
                        <div class="Team-Type">
                            <label for ="TeamType">Team Type<span className="asterisk">* </span><span className="required">(required)</span>:</label>
                            <select name="team-type" required value={TeamType} onChange={(TeamType) => { setTeamType(TeamType.target.value) }}>
                                <option className="team-white" value="default_white">White</option>
                                <option className="team-red" value="default_red">Red</option>
                                <option className="team-blue" value="default_blue">Blue</option>
                                <option className="team-detect" value="Detect">Detect</option>
                                <option className="team-protect" value="Protect">Protect</option>
                                <option className="team-react" value="React">React</option>
                                <option className="team-restore" value="Restore">Restore</option>
                            </select>
                        </div>
                    </div>
                    <div class = "Action-Title">
                        <label for="ActionTitle">Action Title<span className="asterisk">* </span><span className="required">(required)</span>:</label>                   
                        <input type="text" name="ActionTitle" onKeyUp={() => { setActionTitle(document.querySelector('input[name="ActionTitle"]').value) }} placeholder="My Icon Title"></input>
                    </div>
                    <div>
                        <label for ="icon">Select icon file to import<span className="asterisk">* </span><span className="required">(required)</span>:</label>
                        <input type="file" name="png-directory" onChange={() => {setIconUpload(document.querySelector('input[name="png-directory"]').value)}}/>
                    </div>
                    <div class="buttons">
                        <div class="button-container">
                            <button className="cancel-button" onClick={onClose}>Cancel</button>
                            <input type="submit" value="Import" className="create-toa-button" />
                        </div>
                    </div>
                    {(showSuccess && (
                        <SuccessMessage
                            message={'Success: TOA icon was created'}
                            onClose={closeMessage}
                        />)) || (showFail && (
                            <FailMessage
                                message={'Error: Unable to create TOA Icon'}
                                onClose={closeMessage}
                            />
                        ))}
                </form>

            </div>
        </div>
    );
};

export default CreateTOAPage;