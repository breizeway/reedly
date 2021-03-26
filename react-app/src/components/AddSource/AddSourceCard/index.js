import React from 'react';
import './AddSourceCard.css';

const AddSourceCard = ({ title }) => {
    // const dispatch = useDispatch()
    // const sources = useSelector(state => state.sources)
    return (
        <div className="card-container">
            <div className="card">
                <div className="card-header">{ title }</div>
                <div className="card-footer">Featuring Calculated Risk</div>
            </div>
        </div>
    )
}

export default AddSourceCard
