import React, { useEffect, useState } from "react"
import 'reactflow/dist/style.css';
import ViewGraphPage from "./ViewGraphPage";
import './ManageGraphPage.css';

const initialEdges = []
const initialNodes = []

export default function ManageGraphPage({ project, eventList, setEventList }) {
    const [list, setList] = useState([])
    const [edgeList, setEdgeList] = useState([])
    const [fetchEvents, setFetchEvents] = useState(true)

    useEffect(() => {
        if (fetchEvents) {
            const populateNode = () => {
                const newList = eventList.map((event) => ({
                    id: event.id,
                    position: { x: event.xCord !== undefined && event.xCord !== null ? event.xCord : 0, y: event.yCord !== undefined && event.yCord !== null ? event.yCord : 0 },
                    data: {
                        label:
                            `${event.team} Team Activity\nTime: ${event.timestamp}\nLocation: ${event.location}`, eventData: event
                    },
                    height: 85,
                    width: 150 
                }));
                setList([...initialNodes, ...newList]);
            };
            populateNode();
            console.log(eventList)
            
            const populateEdge = () => {
                const newEdgeList = []
                eventList.forEach((event) => {
                    if (event.AdjList && event.AdjList.length > 0) {
                        event.AdjList.forEach((target) => {
                            const tempEdge = {
                                id: `${event.id}-${target.id}`,
                                source: event.id,
                                target: target.id
                            }
                            newEdgeList.push(tempEdge)
                        })
                    }
                })
                setEdgeList([...initialEdges, ...newEdgeList])
            }
            populateEdge()
            setFetchEvents(false)
        }
    }, [fetchEvents, eventList]);

    useEffect(() => {

    }, [list])

    return (
        <div>
            {list.length > 0 &&
                <ViewGraphPage initialNodes={list} initialEdges={edgeList} eventList={eventList} setEventList={setEventList} setList={setList} project={project} setFetchEvents={setFetchEvents} fetchEvents={fetchEvents}/>
            }
        </div>
    )


}