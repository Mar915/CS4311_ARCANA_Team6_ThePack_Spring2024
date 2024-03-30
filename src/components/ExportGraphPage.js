import "./ManageGraphPage.css"
import axios from 'axios';

const ExportGraphPage = ({ open, onClose, nodes, edges }) => {

    if (!open) {
        return null
    }

    // [TO-DO]
    const exportGraph = async () => {
        try {
            const response = await axios.post()
        }
        catch (e) {

        }
    }

    return (
        <div className="export-graph-overlay">
            <div className="export-graph-modal">
                <form>
                    <p className="close-button-export-graph" onClick={onClose}>X</p>
                </form>
            </div>
        </div>
    )
}

export default ExportGraphPage