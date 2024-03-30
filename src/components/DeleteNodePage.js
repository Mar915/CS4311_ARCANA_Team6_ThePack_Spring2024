import "./DeleteNodePage.css"
import React, { useState } from 'react';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';

const DeleteNodePage = ({ open, onClose, node, eventList, setEventList, setList, setSelectedNode, setNodes, project }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    if (!open) {
        return null
    }

    // [TO-DO]
    const deleteNode = async (event) => {
        try {
            event.preventDefault()
            const currEvent = eventList.find(e => e.vectorID === node.id)
            const data = { project, currEvent }
             // await axios.post(`http://127.0.0.1:5000/deleteEvent`, data)
            setEventList(prev => (
                prev.filter(p => p.vectorID !== node.id)
            ))
            setList(prev => (
                prev.filter(p => p.id !== node.id)
            ))
            setNodes(prev => (
                prev.filter(p => p.id !== node.id)
            ))
            setShowSuccess(true);
        }
        catch (error) {
            setShowFail(true);
        }
    }

    const closeMessage = () => {
        setShowFail(false)
        setShowSuccess(false)
    }

    return (
        <div className="delete-node-overlay">
            <div className="delete-node-modal">
            <div className="delete-node-text">
                <p>Are you sure you want to delete node {node.id}?</p>
                <p>Deleting this event will delete the associate event</p>
                <p className="close-button-delete-node" onClick={onClose}>X</p>
                {(showSuccess && (
                    <SuccessMessage
                        message={'Success: Node was deleted'}
                        onClose={closeMessage}
                    />)) || (showFail && (
                        <FailMessage
                            message={'Error: Unable to delete node'}
                            onClose={closeMessage} 
                        />
                    ))}
                    </div>
                <button className="cancel-delete-node-button" onClick={onClose}>Cancel</button>
                <button className="confirm-delete-node-button" onClick={(event) => { deleteNode(event) }}>Delete</button>
            </div>
        </div>
    );
}

export default DeleteNodePage