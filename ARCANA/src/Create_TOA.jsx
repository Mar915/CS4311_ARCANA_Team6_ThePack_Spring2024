import React from "react";

function Create_TOA(){
    <body>
        <h1>
            Create TOA Icon
        </h1>

        <section class="upload-section">
            <label for="file-upload" class="upload-label">
                <i class="fas fa-upload"></i> Upload Icon
            </label>
            <input type="file" id="file-upload" accept="image/*">
        </section>

        <div class="dropdown">
            <div class="team-group">
                <label for ="teams">Team Type<span class = "required">*</span>:</label>
                <select id="dropdown" class="dropdown">
                    <option value="option1">White</option>
                    <option value="option2">Red</option>
                    <option value="option3">Blue</option>
                </select>
            </div>
        </div>

        <div class = "Description-info">
            <label for="Description">Icon Name:</label>
            <input type="text" id="description" name="description" placeholder="">
        </div>

        <div>
            <label for = "checkBox">Default Icon</label>
            <input type="checkbox" id = "myCheckbox" name = "myCheckbox"> 
        </div>

        <div class="buttons">
            <div class="button-container">
                <button class="create-button">Create Icon</button>
                <button class="cancel-button">Cancel</button>
            </div>
        </div>
    </body>
}
export default Create_TOA