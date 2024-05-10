import './TOA.css';
import CreateToa from "./CreateTOA"
import React, { useState } from 'react';
import EditTOA from './EditTOA';
// import DeleteTOA from './DeleteTOA';



function TOA(){
    const [openModalCreate, setOpenCreateModal] = useState(false)
    const [openModalDelete, setOpenDeleteModal] = useState(false)
    const [openModalEdit, setOpenEditModal] = useState(false)

    return(
    <body id='toa-main-body'>
        <header id='toa-main-header'>
        <h1>
            TOA Icon Library
        </h1>
        </header>
        <div class="buttons toa-main-div">
            <div class="button-container">
                <button class="createTOA-button" onClick={() => setOpenCreateModal(true)}>+ Create TOA</button>
                {<CreateToa open={openModalCreate} onClose={() => setOpenCreateModal(false)} project={null}></CreateToa>}
                <button class="edit-button"  onClick={() => setOpenEditModal(true)}>Edit TOA</button>
                {<EditTOA open={openModalEdit} onClose={() => setOpenEditModal(false)} project={null} TOA={null}></EditTOA>}
                <button class="delete-button">Delete TOA</button>
                {/* {<DeleteTOA open={openModalDelete} onClose={() => setOpenDeleteModal(false)} project={null} TOA={null}></DeleteTOA>} */}

            </div>
        </div>
        

        <section class="team-icons">
            <h2>Team TOA Icons</h2>
            <div class="icon-container toa-main-div">
                <div class="icon toa-main-div">
                    <img src={`/Icons/default_red.png`} alt="Default Red" height={83} width={87} />
                    <p>Red Team Activity</p>
                    <p>[Default]</p>
                </div>
                <div class="icon toa-main-div">
                <img src={`/Icons/default_blue.png`} alt="Default Blue" height={83} width={87} />
                    <p>Blue Team Activity</p>
                    <p>[Default]</p>
                </div>
                <div class="icon toa-main-div">
                <img src={`/Icons/default_white.png`} alt="Default White" height={83} width={87} />
                    <p>White Team Activity</p>
                    <p>[Default]</p>
                    
                </div>
            </div>
        </section>

        <section class="team-icons">
            <h2>TOA Action Icons</h2>
            <div class="icon-container toa-main-div">
                <div class="icon toa-main-div">
                    <img src={`/Icons/default_React.png`} alt="Default React" height={83} width={87} />
                    <p>Blue Team Activity</p>
                    <p>[React]</p>
                </div>
                <div class="icon toa-main-div">
                    <img src={`/Icons/default_restore.png`} alt="Default Restore" height={83} width={87} />
                    <p>Blue Team Activity</p>
                    <p>[Restore]</p>
                </div>
                <div class="icon toa-main-div">
                <img src={`/Icons/default_detect.png`} alt="Default Detect" height={83} width={87} />
                <p>Blue Team Activity</p>
                    <p>[Detect]</p>
                </div>
                <div class="icon toa-main-div">
                <img src={`/Icons/default_protect.png`} alt="Default Protect" height={83} width={87} />
                <p>Blue Team Activity</p>
                    <p>[Protect]</p>
                </div>
                <div class="icon toa-main-div">
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