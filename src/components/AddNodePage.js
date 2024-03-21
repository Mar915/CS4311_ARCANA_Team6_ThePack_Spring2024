import "./ManageGraphPage.css"

const AddNodePage = ({ open, onClose, node }) => {

    if (!open) {
        return null
    }

    return (
        <div className="add-node-overlay">
            <div className="add-node-modal">
                <form>
                <p className="close-button-view-node" onClick={onClose}>X</p>
                </form>
            </div>
        </div>
    )
}

export default AddNodePage