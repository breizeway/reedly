import React from 'react';
import './AddSourceCard.css';

const AddSourceCard = ({ title }) => {
    // const dispatch = useDispatch()
    // const sources = useSelector(state => state.sources)
    return (
        <div className="add-source-card">
            <div className="add-source-card__content">
                <div className="add-source-card__card-header">{ title }</div>
                <div className="add-source-card__card-footer">Featuring Calculated Risk</div>
            </div>
        </div>
    )
}

export default AddSourceCard
