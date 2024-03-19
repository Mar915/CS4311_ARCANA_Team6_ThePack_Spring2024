import ReactFlow, { Controls, useNodesState, useEdgesState, addEdge } from "reactflow"
import React, { useCallback } from "react"
import 'reactflow/dist/style.css'
import "./ManageGraphPage.css"

export default function ViewGraphPage({ initialNodes, initialEdges }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    // console.log("Initial Nodes:")
    // console.log(initialNodes)
    // console.log("Nodes:")
    // console.log(nodes)
    console.log("Edges:")
    console.log(edges)
    // console.log("Initial Edges:")
    // console.log(initialEdges)


    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div className="graph-container">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
            </ReactFlow>
        </div>
    );
}