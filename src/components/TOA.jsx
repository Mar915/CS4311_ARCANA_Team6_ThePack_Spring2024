import React from 'react';
import './TOA.css';

function TOA(){
    return(
    <body>
        <header>
        <h1>
            TOA Icon Library
        </h1>
        </header>
        <div class="buttons">
            <div class="button-container">
                <button class="createTOA-button">+ Create TOA</button>
                <button class="edit-button">Edit TOA</button>
                <button class="delete-button">Delete TOA</button>
            </div>
        </div>
        

        <section class="team-icons">
            <h2>Team TOA Icons</h2>
            <div class="icon-container">
                <div class="icon">
                    <img src={`/Icons/default_red.png`} alt="Default Red" height={83} width={87} />
                    <p>Red Team Activity</p>
                    <p>[Default]</p>
                </div>
                <div class="icon">
                <img src={`/Icons/default_blue.png`} alt="Default Blue" height={83} width={87} />
                    <p>Blue Team Activity</p>
                    <p>[Default]</p>
                </div>
                <div class="icon">
                <img src={`/Icons/default_white.png`} alt="Default White" height={83} width={87} />
                    <p>White Team Activity</p>
                    <p>[Default]</p>
                    
                </div>
            </div>
        </section>

        <section class="team-icons">
            <h2>TOA Action Icons</h2>
            <div class="icon-container">
                <div class="icon">
                    <img src={`/Icons/default_React.png`} alt="Default React" height={83} width={87} />
                    <p>Blue Team Activity</p>
                    <p>[React]</p>
                </div>
                <div class="icon">
                    <img src={`/Icons/default_restore.png`} alt="Default Restore" height={83} width={87} />
                    <p>Blue Team Activity</p>
                    <p>[Restore]</p>
                </div>
                <div class="icon">
                <img src={`/Icons/default_detect.png`} alt="Default Detect" height={83} width={87} />
                <p>Blue Team Activity</p>
                    <p>[Detect]</p>
                </div>
                <div class="icon">
                <img src={`/Icons/default_protect.png`} alt="Default Protect" height={83} width={87} />
                <p>Blue Team Activity</p>
                    <p>[Protect]</p>
                </div>
                <div class="icon">
                <img src={`/Icons/failed_attempt.png`} alt="Default Failed Attempt" height={83} width={87} />
                <p>Red Team Activity</p>
                    <p>[Failed Attempt]</p>
                </div>
            </div>
        </section>

    </body>
    );
}
export default TOA;