import React from 'react';

function TOA(){
    return(
    <body>
        <header>
        <h1>
            TOA Icon Library
        </h1>

        <div class="buttons">
            <div class="button-container">
                <button class="createTOA-button">+ Create TOA</button>
                <button class="edit-button">Edit TOA</button>
                <button class="delete-button">Delete TOA</button>
            </div>
        </div>
        </header>
        <section class="team-icons">
            <h2>Red Team TOA Icons</h2>
            <div class="icon-row">
                <div class="icon">
                    <img src="red-user-icon-hi.png" alt="Icon 1"/>
                    <p>Red Team Activity</p>
                    <p>[Default]</p>
                </div>
                <div class="icon">
                    <img src="redshield.jfif" alt="Icon 2"/>
                    <p>Protection</p>
                </div>
                <div class="icon">
                    <img src= "..\public\Icons\default_blue.png"  alt="default_blue"/>
                </div>
            </div>
        </section>

        <section class="team-icons">
            <h2>Blue Team TOA Icons</h2>
            
            <div class="icon-row">
                <div class="icon">
                    <img src="blue-user-icon-hi.png" alt="Icon 1"/>
                    <p>Blue Team Activity</p>
                    <p>[Default]</p>
                </div>
                <div class="icon">
                    <img src="icon2.png" alt="Icon 2"/>
                </div>
                <div class="icon">
                    <img src="icon3.png" alt="Icon 3"/>
                </div>
            </div>
        </section>

        <section class="team-icons">
            <h2>White Team TOA Icons</h2>
            
            <div class="icon-row">
                <div class="icon">
                    <img src="User-Icon-Grey-300x300.png" alt="Icon 1"/>
                    <p>White Team Activity</p>
                    <p>[Default]</p>
                </div>
                <div class="icon">
                    <img src="icon2.png" alt="Icon 2"/>
                </div>
                <div class="icon">
                    <img src="icon3.png" alt="Icon 3"/>
                </div>
            </div>
        </section>

    </body>
    );
}
export default TOA;