import ReactFlow, { Controls, useNodesState, useEdgesState, addEdge, Background } from "reactflow"
import React, { useCallback, useState } from "react"
import 'reactflow/dist/style.css'
import "./ManageGraphPage.css"
import axios from 'axios';
import ViewNodePage from "./ViewNodePage";


export default function ViewGraphPage({ initialNodes, initialEdges }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null);
    const [openModalView, setOpenViewModal] = useState(false)
    const [openModalEdit, setOpenEditModal] = useState(false)
    const [openModalAdd, setOpenAddModal] = useState(false)
    // console.log("Initial Nodes:")
    // console.log(initialNodes)
    // console.log("Nodes:")
    // console.log(nodes)
    // console.log("Edges:")
    // console.log(edges)
    // console.log("Initial Edges:")
    // console.log(initialEdges)

    // On save, save graph edges and nodes
    // Need position and edges to rebuild graph later
    const saveGraph = async () => {
        try {
            const response = await axios.post()
        }   
        catch (e) {

        }
    }

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
            { selectedNode && <ViewNodePage open={openModalView} onClose={() => setOpenViewModal(false)} node={selectedNode}/>}
            <button className="edit-node-button">Edit Node</button>
            <button className="add-node-button">Add Node</button>
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
            <button className="export-graph-button">Export Graph</button>
            <button className="import-graph-button">Import Graph</button>
        </div>
    );
}