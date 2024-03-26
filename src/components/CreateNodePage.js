import "./ManageGraphPage.css"
import axios from 'axios';

const CreateNodePage = ({ open, onClose, node }) => {

    if (!open) {
        return null
    }

    // [TO-DO]
    const createNode = async () => {
        try {
            const response = await axios.post()
        }
        catch (e) {

        }
    }

    return (
        <div className="create-node-overlay">
            <div className="create-node-modal">
                <form>
                <p className="close-button-create-node" onClick={onClose}>X</p>
                </form>
            </div>
        </div>
    )
}

export default CreateNodePage