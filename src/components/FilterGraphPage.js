import "./ManageGraphPage.css"
import axios from 'axios';

const FilterGraphPage = ({ open, onClose, nodes, edges }) => {

    if (!open) {
        return null
    }

    // [TO-DO]
    const filterGraph = async () => {
        try {
            const response = await axios.post()
        }
        catch (e) {

        }
    }

    return (
        <div className="filter-graph-overlay">
            <div className="filter-graph-modal">
                <form>
                    <p className="close-button-filter-graph" onClick={onClose}>X</p>
                </form>
            </div>
        </div>
    )
}

export default FilterGraphPage