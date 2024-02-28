import React, { useState, useEffect } from 'react';
import './ManageProjectPage.css';
import CreateProjectPage from './CreateProjectPage';
import IngestLogsPage from './IngestLogsPage';
import DeleteProjectPage from './DeleteProjectPage';
import FailMessage from './FailMessage';


function ManageProjectPage({ navigateTo }) {
    const [openModalCreate, setOpenCreateModal] = useState(false)
    const [openModalIngest, setOpenIngestModal] = useState(false)
    const [openModalDelete, setOpenDeleteModal] = useState(false)
    const [showFail, setShowFail] = useState(false)
    const [projects, setProjects] = useState([])
    const [selectProject, setSelectProject] = useState(null)

    useEffect(() => {
        const displayProject = async () => {
            try {
                const response = await fetch('http://localhost:5000/showProjects');
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data)
                    console.log(projects)
                }
                else {
                    console.log("FAIL")
                    setShowFail(true);
                }
            }
            catch (e) {
                console.log("FAIL")
                console.log(projects)        //verifying fetch actually failed
               // console.error('Error:', e);  //added so I can see exactly what the issue is
                setShowFail(true);
            }
        }
        displayProject();
    }, [])

    const closeMessage = () => {
        setShowFail(false)
    } 

    const selectLiProject = (selected) => {
        console.log(selected)
        setSelectProject(selected)
    }



    return (
        <div className="manage-project-page"> 
            <div className="proj-header-container">
            <h1 className="proj-header">Manage Projects</h1>
            </div>
            <button className="create-proj-button" onClick={() => setOpenCreateModal((true))}>+ Create Project</button>
            <CreateProjectPage open={openModalCreate} onClose={() => setOpenCreateModal(false)}></CreateProjectPage>
            <div className="proj-list-container">
                <ul className="proj-list">
                    {/* This SHOULD populate proj-list */}
                    { projects.map(project => (
                        <li key={project.projName} className={`proj-li ${selectProject === project ? 'selected' : ''}`}  onClick={() => selectLiProject(project)}>Project {project.projName}</li>
                    )) }
                    <li className={`proj-li ${selectProject === 'Project A' ? 'selected' : ''}`} key="Project A" onClick={() => selectLiProject("Project A"/*project*/)}>Project A</li>
                    <li className={`proj-li ${selectProject === 'Project B' ? 'selected' : ''}`} onClick={() => selectLiProject("Project B"/*project*/)}>Project B</li>
                    <li className="proj-li">Project B</li>
                    <li className="proj-li">Project B</li>
                    <li className="proj-li">Project B</li>
                    <li className="proj-li">Project B</li>
                    <li className="proj-li">Project B</li>
                    <li className="proj-li">Project B</li>
                    <li className="proj-li">Project B</li>
                    <li className="proj-li">Project B</li>
                    <li className="proj-li">Project B</li>
                    <li className="proj-li">Project B</li>
                    <li className="proj-li">Project B</li>
                </ul>
                {(showFail && (
                    <FailMessage
                      message={'Error: Unable to load projects'}
                      onClose={closeMessage}
                    />
                  ))}
            </div>
            <div className="proj-option-buttons">
                <button className="inject-proj-button" onClick={() => setOpenIngestModal((true))}>Injest Logs</button>
                <IngestLogsPage open={openModalIngest} onClose={() => setOpenIngestModal(false)} project={selectProject}></IngestLogsPage>
                <button className="delete-proj-button" onClick={() => setOpenDeleteModal((true))}>Delete Project</button>
                <DeleteProjectPage open={openModalDelete} onClose={() => setOpenDeleteModal(false)} project={selectProject}></DeleteProjectPage>
                <button className="open-proj-button" onClick={() => navigateTo('tempProjectPage')}>Open Project</button>
            </div>
        </div>
    );
}

export default ManageProjectPage;