import React, { useState } from 'react';
import "./FilterGraphPage.css"
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';

const FilterGraphPage = ({ open, onClose, setEventList, eventList, nodes, setNodes, setFetchEvents }) => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [initials, setInitials] = useState("")
    const [team, setTeam] = useState("")
    const [location, setLocation] = useState("")
    const [vector, setVector] = useState("")
    const [source, setSource] = useState("")
    const [host, setHost] = useState("")
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    if (!open) {
        return null
    }

    const filterGraph = async (event) => {
        try {
            const data = { date, time, initials, team, location, vector, source, host }
            console.log(data)
            event.preventDefault()
            // Filter any that do not match non-null or empty string criteria
            const applyFilter = (item) => {
                return (!date || item.timestamp.split(" ")[0] === date) &&
                    (!time || item.timestamp.split(" ")[1] === time + ":00") &&
                    (!initials || item.initials === initials) &&
                    (!team || item.team === team) &&
                    (!location || item.location === location) &&
                    (!vector || item.vectorID === vector) &&
                    (!source || item.sourceHost === source) &&
                    (!host || item.targetHostList === host)
            }
            const filtered = eventList.filter(applyFilter)
            // Filter any that do not match non-null or empty string criteria
            const applyNodeFilter = (item) => {
                return (!date || item.data.eventData.timestamp.split(" ")[0] === date) &&
                (!time || item.data.eventData.timestamp.split(" ")[1] === time + ":00") &&
                (!initials || item.data.eventData.initials === initials) &&
                (!team || item.data.eventData.team === team) &&
                (!location || item.data.eventData.location === location) &&
                (!vector || item.data.eventData.vectorID === vector) &&
                (!source || item.data.eventData.sourceHost === source) &&
                (!host || item.targetHostList === host)
            }
            const filteredNode = nodes.filter(applyNodeFilter)
            console.log("FILTERED RESULTS", filtered)
            console.log("FILTERED NODES ", filteredNode)
            if (filtered.length > 0 && filteredNode.length > 0) {
                setShowSuccess(true);
                setNodes(filteredNode)
                setEventList(filtered)
                setFetchEvents(true)
                setTime("")
                setDate("")
                setInitials("")
                setTeam("")
                setLocation("")
                setVector("")
                setSource("")
                setHost("")
            }
            else {
                console.log("No matches")
                setShowFail(true)
            }
        }
        catch (e) {
            console.log("FAIL")
            setShowFail(true);
        }
    }

    const closeMessage = () => {
        setShowFail(false)
        setShowSuccess(false)
    }

    return (
        <div className="filter-graph-overlay">
            <div className="filter-graph-modal">
                <h1>Filter Nodes</h1>
                <p className="close-button-filter-graph" onClick={onClose}>X</p>
                <form className="filter-graph-form" onSubmit={(currNode) => { filterGraph(currNode) }}>
                    <label>
                        Date
                        <br></br>
                        <input type="date" name="date" value={date} onChange={(e) => { setDate(e.target.value) }} />
                    </label>
                    <br></br>
                    <label>
                        Time
                        <br></br>
                        <input type="time" name="time" value={time} onChange={(e) => { setTime(e.target.value) }} placeholder='hh:mm:ss' />
                    </label>
                    <label>
                        Initials
                        <br></br>
                        <input type="text" name="initials" value={initials} onChange={(e) => { setInitials(e.target.value) }} placeholder="III" />
                    </label>
                    <br></br>
                    <label>
                        Team
                        <br></br>
                        <select name="team" value={team} onChange={(e) => { setTeam(e.target.value) }}>
                            <option className="white" value="White">White</option>
                            <option className="red" value="Red">Red</option>
                            <option className="blue" value="Blue">Blue</option>
                        </select>
                    </label>
                    <br></br>
                    <label>
                        Location
                        <br></br>
                        <input type="text" name="location" value={location} onChange={(e) => { setLocation(e.target.value) }} />
                    </label>
                    <label>
                        Vector ID
                        <br></br>
                        <input type="text" name="vector" value={vector} onChange={(e) => { setVector(e.target.value) }} />
                    </label>
                    <label>
                        Source Host
                        <br></br>
                        <input type="text" name="source" value={source} onChange={(e) => { setSource(e.target.value) }} placeholder="0.0.0.0" />
                    </label>
                    <label>
                        Target Host[s]
                        <br></br>
                        <input type="text" name="host" value={host} onChange={(e) => { setHost(e.target.value) }} placeholder="0.0.0.0, 0.0.0.1" />
                    </label>
                    <br></br>
                    <button className="cancel-filter-button" onClick={onClose}>Cancel</button>
                    <input type="submit" value="Filter" className="filter-graph-confirm-button" />
                    {(showSuccess && (
                        <SuccessMessage
                            message={'Success: Graph was filtered'}
                            onClose={closeMessage}
                        />)) || (showFail && (
                            <FailMessage
                                message={'Error: Unable to filter graph'}
                                onClose={closeMessage}
                            />
                        ))}
                </form>

            </div>
        </div>
    )
}

export default FilterGraphPage