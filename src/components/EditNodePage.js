import "./ManageGraphPage.css"
import axios from 'axios';

const EditNodePage = ({ open, onClose, node, nodes }) => {

    if (!open) {
        return null
    }

    // [TO-DO]
    const editNode = async () => {
        try {
            const response = await axios.post()
        }
        catch (e) {

        }
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