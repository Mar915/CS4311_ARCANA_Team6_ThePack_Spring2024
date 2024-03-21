import "./ManageGraphPage.css"

const EditNodePage = ({ open, onClose, node }) => {

    if (!open) {
        return null
    }

    return (
        <div className="edit-node-overlay">
            <div className="edit-node-modal">
                <form>
                <p className="close-button-edit-node" onClick={onClose}>X</p>
                </form>
            </div>
        </div>
    )
}

export default EditNodePage