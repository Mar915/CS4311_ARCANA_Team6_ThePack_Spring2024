import React, { useState } from 'react';
import './ManageProjectPage.css';
import CreateProjectPage from './CreateProjectPage';
import IngestLogsPage from './IngestLogsPage';
import DeleteProjectPage from './DeleteProjectPage';

function ManageProjectPage() {
    const [openModalCreate, setOpenCreateModal] = useState(false)
    const [openModalIngest, setOpenIngestModal] = useState(false)
    const [openModalDelete, setOpenDeleteModal] = useState(false)
    return (
        <div className="manage-project-page"> 
            <div className="proj-header-container">
            <h1 className="proj-header">Manage Projects</h1>
            </div>
            <button className="create-proj-button" onClick={() => setOpenCreateModal((true))}>+ Create Project</button>
            <CreateProjectPage open={openModalCreate} onClose={() => setOpenCreateModal(false)}></CreateProjectPage>
            <div className="proj-list-container">
                <ul className="proj-list">
                </ul>
            </div>
            <div className="proj-option-buttons">
                <button className="inject-proj-button" onClick={() => setOpenIngestModal((true))}>Injest Logs</button>
                <IngestLogsPage open={openModalIngest} onClose={() => setOpenIngestModal(false)}></IngestLogsPage>
                <button className="delete-proj-button" onClick={() => setOpenDeleteModal((true))}>Delete Project</button>
                <DeleteProjectPage open={openModalDelete} onClose={() => setOpenDeleteModal(false)}></DeleteProjectPage>
                <button className="open-proj-button">Open Project</button>
                
            </div>
        </div>
    );
}

export default ManageProjectPage;