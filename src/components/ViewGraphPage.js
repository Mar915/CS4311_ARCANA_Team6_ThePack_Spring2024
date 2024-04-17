import ReactFlow, { Controls, useNodesState, useEdgesState, addEdge, Background } from "reactflow"
import React, { useCallback, useState, useEffect } from "react"
import 'reactflow/dist/style.css'
import "./ManageGraphPage.css"
import axios from 'axios';
import ViewNodePage from "./ViewNodePage";
import EditNodePage from "./EditNodePage";
import CreateNodePage from "./CreateNodePage";
import DeleteNodePage from "./DeleteNodePage";
import ExportGraphPage from "./ExportGraphPage"
import ImportGraphPage from "./ImportGraphPage"
import FilterGraphPage from "./FilterGraphPage"
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';
import DownloadButtonPNG from "./DownloadButtonPNG";
import DownloadButtonJPEG from "./DownloadButtonJPEG";
import DownloadButtonCSV from "./DownloadButtonCSV";

export default function ViewGraphPage({ initialNodes, initialEdges, eventList, setEventList, setList, project, setFetchEvents, fetchEvents }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null);
    const [openModalView, setOpenViewModal] = useState(false)
    const [openModalEdit, setOpenEditModal] = useState(false)
    const [openModalCreate, setOpenCreateModal] = useState(false)
    const [openModalDelete, setOpenDeleteModal] = useState(false)
    const [openModalImport, setOpenImportModal] = useState(false)
    const [openModalExport, setOpenExportModal] = useState(false)
    const [openModalFilter, setOpenFilterModal] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    // On save, save graph edges and nodes
    // Need position and edges to rebuild graph later
    // [TO-DO]
    const saveGraph = async (event) => {
        try {
            event.preventDefault()
            // Possible solution to save edges
            // Not sure which post to call
            const updateEvents = []
            for (let e of eventList) {
                const tempAdjList = []
                edges.forEach((edge) => {
                    if (edge.source === e.id) {
                        tempAdjList.push(edge.target)
                    }
                })
                e.adjList = tempAdjList
                if (tempAdjList.length === 1) {
                    e.adjList = tempAdjList[0]
                }
                let x = 0
                let y = 0
                nodes.forEach((node) => {
                    if (node.id === e.id) {
                        x = node.position.x
                        y = node.position.y
                     
                    }
                })
                e.xCord = x
                e.yCord = y
                updateEvents.push({id: e.id, eventInfo: e})
            }
            const data = {updateEvents, project}
            console.log(data)
            // Is this the correct function?
            await axios.post('http://127.0.0.1:5000/updateAllEvents', data)
            setShowSuccess(true);
        }
        catch (e) {
            console.log("Failure :{")
            setShowFail(true);
        }
    }

    useEffect(() => {

    }, [eventList, nodes, edges, fetchEvents])


    const handleSelect = (event, node) => {
        console.log(node)
        setSelectedNode(node); // Update the selected node when it is clicked
    };

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const closeMessage = () => {
        setShowFail(false)
        setShowSuccess(false)
    } 

    return (
        <div>
            <button className="view-node-button" onClick={() => setOpenViewModal((true))}>View Node</button>
            {selectedNode && openModalView && <ViewNodePage open={openModalView} onClose={() => setOpenViewModal(false)} node={selectedNode} />}
            <button className="edit-node-button" onClick={() => setOpenEditModal((true))}>Edit Node</button>
            {selectedNode && openModalEdit && <EditNodePage open={openModalEdit} onClose={() => setOpenEditModal(false)} project={project} node={selectedNode} nodes={initialNodes} setFetchEvents={setFetchEvents} />}
            <button className="create-node-button" onClick={(event) => {setOpenCreateModal((true)); saveGraph(event);}}>Create Node</button>
            {openModalCreate && <CreateNodePage open={openModalCreate} onClose={() => setOpenCreateModal(false)} eventList={eventList} setEventList={setEventList} setList={setList} project={project} setFetchEvents={setFetchEvents} setNodes={setNodes} />}
            <button className="delete-node-button" onClick={() => setOpenDeleteModal((true))}>Delete Node</button>
            {selectedNode && openModalDelete && <DeleteNodePage open={openModalDelete} onClose={() => setOpenDeleteModal(false)} node={selectedNode} eventList={eventList} setEventList={setEventList} setList={setList} setNodes={setNodes} project={project} setFetchEvents={setFetchEvents} />}
            <div className="graph-container">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={handleSelect}
                >
                    <Background />
                    <Controls />
                    <DownloadButtonCSV eventList={eventList} nodes={nodes} edges={edges}/>
                    <DownloadButtonPNG />
                    <DownloadButtonJPEG />
                </ReactFlow>
            </div>
            {(showSuccess && (
                        <SuccessMessage
                            message={'Success: Graph was saved'}
                            onClose={closeMessage}
                        />)) || (showFail && (
                            <FailMessage
                                message={'Error: Unable to save graph'}
                                onClose={closeMessage}
                            />
                        ))}
            <button className="save-graph-button" onClick={(event) => saveGraph(event)}>Save Graph</button>
            <button className="import-graph-button" onClick={() => setOpenImportModal((true))}>Import Graph</button>
            {openModalImport && <ImportGraphPage open={openModalImport} onClose={() => setOpenImportModal(false)} setEventList={setEventList} setList={setList} setNodes={setNodes} nodes={nodes} edges={edges} setFetchEvents={setFetchEvents} />}
            <button className="filter-graph-button" onClick={() => setOpenFilterModal((true))}>Filter Graph</button>
            {openModalFilter && <FilterGraphPage open={openModalFilter} onClose={() => setOpenFilterModal(false)} setEventList={setEventList} eventList={eventList} setList={setList} nodes={nodes} setNodes={setNodes} setFetchEvents={setFetchEvents}/>}
        </div>
    );
}