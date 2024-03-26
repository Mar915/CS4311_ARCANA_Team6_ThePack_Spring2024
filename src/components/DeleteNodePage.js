import "./ManageGraphPage.css"
import axios from 'axios';

const DeleteNodePage = ({ open, onClose, node, nodes, setList }) => {

    if (!open) {
        return null
    }

    // [TO-DO]
    const deleteNode = async (event) => {
        try {
            event.preventDefault()
            setList(prev => (
                prev.filter(p => p.vectorID !== node.vectorID)
            ))
            
            // Attempting use axios.delete
            // await axios.post(`http://127.0.0.1:5000/deleteEvent`, data)
            //console.log(event.eventName)
            // setShowSuccess(true);
        }
        catch (error) {
            console.log("FAIL")
            // setShowFail(true);
        }
    }

    return (
        <div className="delete-node-overlay">
            <div className="delete-node-modal">
                <p>Are you sure you want to delete the event {node.id}?</p>
                <p className="close-button-delete-node" onClick={onClose}>X</p>
                {/* {(showSuccess && (
                    <SuccessMessage
                        message={'Success: Node was deleted'}
                        onClose={closeMessage}
                    />)) || (showFail && (
                        <FailMessage
                            message={'Error: Unable to delete node'}
                            onClose={closeMessage}
                        />
                    ))} */}
                <button className="cancel-delete-node-button" onClick={onClose}>Cancel</button>
                <button className="confirm-delete-node-button" onClick={(event) => { deleteNode(event) }}>Delete</button>
            </div>
        </div>
    );
}

export default DeleteNodePage