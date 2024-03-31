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

export default function ViewGraphPage({ initialNodes, initialEdges, eventList, setEventList, setList, project, setFetchEvents }) {
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

    // On save, save graph edges and nodes
    // Need position and edges to rebuild graph later
    // [TO-DO]
    const saveGraph = async () => {
        try {
            const response = await axios.post()
        }
        catch (e) {

        }
    }

    useEffect(() => {

    }, [eventList, nodes])

    const handleSelect = (event, node) => {
        console.log(node)
        setSelectedNode(node); // Update the selected node when it is clicked
    };

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    return (
        <div>
            <button className="view-node-button" onClick={() => setOpenViewModal((true))}>View Node</button>
            {selectedNode && openModalView && <ViewNodePage open={openModalView} onClose={() => setOpenViewModal(false)} node={selectedNode} />}
            <button className="edit-node-button" onClick={() => setOpenEditModal((true))}>Edit Node</button>
            {selectedNode && openModalEdit && <EditNodePage open={openModalEdit} onClose={() => setOpenEditModal(false)} node={selectedNode} nodes={initialNodes} setFetchEvents={setFetchEvents} />}
            <button className="create-node-button" onClick={() => setOpenCreateModal((true))}>Create Node</button>
            {selectedNode && openModalCreate && <CreateNodePage open={openModalCreate} onClose={() => setOpenCreateModal(false)} node={selectedNode} nodes={initialNodes} setFetchEvents={setFetchEvents}/>}
            <button className="delete-node-button" onClick={() => setOpenDeleteModal((true))}>Delete Node</button>
            {selectedNode && openModalDelete && <DeleteNodePage open={openModalDelete} onClose={() => setOpenDeleteModal(false)} node={selectedNode} eventList={eventList} setEventList={setEventList} setList={setList} setSelectedNode={setSelectedNode} setNodes={setNodes} project={project} setFetchEvents={setFetchEvents}/>}
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
                </ReactFlow>
            </div>
            <button className="save-graph-button">Save Graph</button>
            <button className="export-graph-button" onClick={() => setOpenExportModal((true))}>Export Graph</button>
            {openModalExport && <ExportGraphPage open={openModalExport} onClose={() => setOpenExportModal(false)} nodes={nodes} edges={edges}/>}
            <button className="import-graph-button" onClick={() => setOpenImportModal((true))}>Import Graph</button>
            {openModalImport && <ImportGraphPage open={openModalImport} onClose={() => setOpenImportModal(false)} nodes={nodes} edges={edges}/>}
            <button className="filter-graph-button" onClick={() => setOpenFilterModal((true))}>Filter Graph</button>
            {openModalFilter && <FilterGraphPage open={openModalFilter} onClose={() => setOpenFilterModal(false)} nodes={nodes} edges={edges}/>}
        </div>
    );
}