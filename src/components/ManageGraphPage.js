import ReactFlow, { Controls, useNodesState, useEdgesState, addEdge } from "reactflow"
import React, { useCallback, useEffect, useState } from "react"
import 'reactflow/dist/style.css';
import ViewGraphPage from "./ViewGraphPage";
import './ManageGraphPage.css';


const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }},
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' }},
]
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }]

export default function ManageGraphPage({ project, eventList }) {
    const [list, setList] = useState([])
    // <td>{event.isMalformed}</td>
    // <td>{event.timestamp}</td>
    // <td>{event.initials}</td>
    // <td>{event.team}</td>
    // <td>{event.posture}</td>
    // <td>{event.description}</td>
    // <td>{event.location}</td>
    // <td>{event.sourceHost}</td>
    // <td>{event.targetHostList}</td>
    // <td>{event.vectorID}</td>
    // <td>{event.dataSource}</td>
    // team, time, posture, location, data source, vector id, description
    useEffect(() => {
        const populateNode = () => {
            const newList = eventList.map((event) => ({
                id: event.vectorID,
                position: { x: 0, y: 0 },
                data: { label: 
                `${event.team} Team Activity\nTime: ${event.timestamp}\nLocation: ${event.location}`, eventData: event }
            }));
            setList([...initialNodes, ...newList]);
        };
        populateNode();
    }, [eventList]);

    

    return (
        <div>
            {/* <p>s</p>
             <div>
                {list.map((item, index) => (
                    <p key={index}>{JSON.stringify(item)}</p>
                ))}
            </div> */}
            {list.length > 0 &&
                <ViewGraphPage initialNodes={list} initialEdges={initialEdges} />
            }
        </div>
    )


}