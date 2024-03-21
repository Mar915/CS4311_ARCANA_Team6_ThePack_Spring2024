import "./ManageGraphPage.css"

const ViewNodePage = ({ open, onClose, node }) => {

    if (!open) {
        return null
    }

    return (
        <div className="view-node-overlay">
            <div className="view-node-modal">
                <div className="node-text">
                <p>Team: {node.data.eventData.team}</p>
                <p>Timestamp: {node.data.eventData.timestamp}</p>
                <p>Posture: {node.data.eventData.posture}</p>
                <p>Location: {node.data.eventData.location}</p>
                <p>Data Source: {node.data.eventData.dataSource}</p>
                <p>Vector ID: {node.data.eventData.vectorID}</p>
                <p>Source: {node.data.eventData.sourceHost}</p>
                <p>Target(s): {node.data.eventData.targetHostList}</p>
                <p>Initials: {node.data.eventData.initials}</p>
                <p>Malformed: {node.data.eventData.isMalformed}</p>
                <p>Description: {node.data.eventData.description}</p>
                <p className="close-button-view-node" onClick={onClose}>X</p>
                </div>
            </div>
        </div>
    )
}

export default ViewNodePage