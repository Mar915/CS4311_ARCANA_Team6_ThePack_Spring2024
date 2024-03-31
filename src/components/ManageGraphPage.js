import ReactFlow, { Controls, useNodesState, useEdgesState, addEdge } from "reactflow"
import React, { useCallback, useEffect, useState } from "react"
import 'reactflow/dist/style.css';
import ViewGraphPage from "./ViewGraphPage";
import './ManageGraphPage.css';

const initialNodes = []

export default function ManageGraphPage({ project, eventList, setEventList }) {
    const [list, setList] = useState([])
    const [initialEdges, setInitialEdges] = useState(null)
    const [fetchEvents, setFetchEvents] = useState(true)

    useEffect(() => {
        if (fetchEvents) {
            const populateNode = () => {
                const newList = eventList.map((event) => ({
                    id: event.id,
                    position: { x: event.xCord !== undefined ? event.xCord : 0, y: event.xCord !== undefined ? event.xCord : 0 },
                    data: {
                        label:
                            `${event.team} Team Activity\nTime: ${event.timestamp}\nLocation: ${event.location}`, eventData: event
                    }
                }));
                setList([...initialNodes, ...newList]);
            };
            populateNode();
            
            const populateEdge = () => {
                const initialEdges = []
                eventList.forEach((event) => {
                    if (event.AdjList && event.AdjList.length > 0) {
                        event.AdjList.forEach((target) => {
                            const tempEdge = {
                                id: `${event.id}-${target.id}`,
                                source: event.id,
                                target: target.id
                            }
                            initialEdges.push(tempEdge)
                        })
                    }
                })
                setInitialEdges(initialEdges)
            }
            populateEdge()
            setFetchEvents(false)
        }
    }, [fetchEvents]);

    return (
        <div>
            {list.length > 0 &&
                <ViewGraphPage initialNodes={list} initialEdges={initialEdges} eventList={eventList} setEventList={setEventList} setList={setList} project={project} setFetchEvents={setFetchEvents} />
            }
        </div>
    )


}