import React, { useState } from 'react';
import './EditTOA.css';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';
// [TO DO]: Change project to project.eventName
const EditTOAPage = ({ open, onClose, project, TOA}) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [TeamType, setTeamType] = useState('');
    const [ActionTitle, setActionTitle] = useState('');
    const [IconUpload, setIconUpload] = useState('');
    const [defaultIcon, setDefaultIcon] = useState('');

    const EditTOA = async (TOA) => {
        if (!open) {
            return null
        }
    
        const TOAData = {
            team: TeamType, title: ActionTitle, icon: IconUpload 
        }
        const data = {
            project, TOAData
        }

        try {
            console.log(data)
            await axios.post('http://127.0.0.1:5000/editTOA', data)
            setTeamType("");
            setActionTitle("");
            setIconUpload("");
            setDefaultIcon(false);
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
        <div className="edit-toa-overlay">
            <div className="edit-toa-modal">
                <h1>Edit TOA Icon</h1>
                <p className="close-button-create-toa" onClick={onClose}>X</p>
                <form className="edit-toa-form" onSubmit={(TOA) => { EditTOA(TOA) }}>
                    <div class = "Icon-image">
                        <label for="IconImage">Icon Image:</label>
                    </div>
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
                    <label for ="icon">Select different image for the icon:</label>
                        <input type="text" name="file" placeholder="ex. /icon1.png"></input><button class="create-button">Browse</button>
                    </div>
                    <div>
                    <label for = "checkBox">Default Icon for </label>  
                        <input type="checkbox" name="default-icon" checked={defaultIcon} onChange={() => { setDefaultIcon(!defaultIcon) }} />
                    </div>
                    <div class="buttons">
                        <div class="button-container">
                            <button className="cancel-button" onClick={onClose}>Cancel</button>
                            <input type="submit" value="Done" className="create-toa-button" />
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

export default EditTOAPage;