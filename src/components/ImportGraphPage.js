import "./ManageGraphPage.css"
import axios from 'axios';

const ImportGraphPage = ({ open, onClose,  nodes, edges }) => {

    if (!open) {
        return null
    }

    // [TO-DO]
    const importGraph = async () => {
        try {
            const response = await axios.post()
        }
        catch (e) {

        }
    }

    return (
        <div className="import-graph-overlay">
            <div className="import-graph-modal">
                <form>
                    <p className="close-button-import-graph" onClick={onClose}>X</p>
                </form>
            </div>
        </div>
    )
}

export default ImportGraphPage