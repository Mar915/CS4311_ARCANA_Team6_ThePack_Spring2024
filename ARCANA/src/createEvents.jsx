import React from 'react';

function createEvent(){
    <body>
        <div class = "page-title">
        <h1>
            Create Event
        </h1>
        </div>
        <div class = "date-info">
            <label for="date">Date:</label>
            <input type="date" id="date" name="date" placeholder="mm/dd/yyyy">
        </div>
        
        <div class = "time-info">
            <label for="time">Time:</label>
            <input type="text" id="time" name="time" placeholder="hh:mm:ss">
        </div>
        
        <div class = "initials-info">
            <label for="initials">Initials <span class = "required">*</span>:</label>
            <input type="text" id="initials" name="initials" placeholder="III">
        </div>
        
        <div class="dropdown">
        <div class="team-group">
            <label for ="teams">Team<span class = "required">*</span>:</label>
            <select id="dropdown" class="dropdown">
                <option value="option1">White</option>
                <option value="option2">Red</option>
                <option value="option3">Blue</option>
            </select>
        </div>
        </div>
        
        <div class = "posture-info">
        <label for="posture">Posture:</label>
        <input type="text" id="posture" name="posture" placeholder="">
        </div>
        
        <div class = "location-info">
            <label for="location">Location:</label>
            <input type="text" id="location" name = "location" placeholder="Location">
        </div>
        
        <div class = "vectorid-info">
            <label for="vectorid">Vector ID:</label>
            <input type="text" id="vectorid" name="vectorid" placeholder="Vector ID">
        </div>

        <div class = "source-info">
            <label for="source">Source Host:</label>
            <input type="text" id="source" name="source" placeholder="0.0.0.0">
        </div>

        <div class = "target-info">
            <label for="target">Target Host[s]</label>
            <input type="text" id="target" name="target" placeholder="0.0.0.0, 0.0.0.1">
        </div>

        <div class = "description-info">
            <label for="description">Description<span class = "required">*</span>:</label>
            <input type="text" id="description" name="description" placeholder="Description">
        </div>

        <div class="container">
        <i class="fas fa-user-secret anonymous-icon"></i>
        </div>
        
        <div>
            <label for = "checkBox">Auto Create Edges</label>
            <input type="checkbox" id = "myCheckbox" name = "myCheckbox"> 
        </div>

        <div class="buttons">
        <div class="button-container">
            <button class="create-button">Create</button>
            <button class="cancel-button">Cancel</button>
        </div>
        </div>

        <div class="error">
        <div class="error-message" id="error-message">Error: Required field not filled out<button onclick="closeError()">x</button></div>
        </div>

        <div class="success">
        <div class="success-message" id="success-message">Success: You have successfully created the event<button onclick="closeSuccess()">x</button></div>
        </div>
    

    </body>
}
export default createEvent
    