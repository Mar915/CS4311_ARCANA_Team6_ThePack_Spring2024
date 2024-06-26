import React from 'react';
import { Panel } from 'reactflow';
import "./ExportGraphPage.css"

function DownloadButtonCSV(eventList, nodes, edges) {
    const onClick = () => {
        const header = ["isMalformed", "timestamp", "initials", "team", "posture", "description", "location", "sourceHost", "targetHostList", "vectorID", "dataSource", "icon", "id", "adjList", "position"]
        const data = []
        for (let e of eventList.eventList) {
            let tempAdjList = []
            eventList.edges.forEach((edge) => {
                if (edge.source === e.id) {
                    tempAdjList.push(edge.target)
                }

            })
            // If multi edged, format "-"
            if (tempAdjList.length > 1) {
                tempAdjList = tempAdjList.join("-")
            }
            console.log(tempAdjList)
            let x = 0
            let y = 0
            eventList.nodes.forEach((node) => {
                if (node.id === e.id) {
                    x = node.position.x
                    y = node.position.y
                }
            })
            // Row:
            // Event: isMalformed, timestamp, initials, team, posture, description, location, sourceHost, targetHostList, vectorID, dataSource, icon, id, adjList, position
            let row = [
                e.isMalformed,
                e.timestamp,
                e.initials,
                e.team,
                e.posture,
                e.description,
                e.location,
                e.sourceHost,
                e.targetHostList,
                e.vectorID,
                e.dataSource,
                e.icon,
                e.id,
                tempAdjList,
                `"${x},${y}"`
            ]
            data.push(row)
        }
        const content = [header, ...data].map(row => row.join(',')).join("\n")
        const blob = new Blob([content], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a');
        link.href = url;
        link.download = `reactflow.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }

    return (
        <Panel position="bottom-left">
            <button className="download-btn" onClick={onClick}>
                Export CSV
            </button>
        </Panel>
    );
}

export default DownloadButtonCSV;
