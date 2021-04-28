import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { postFeed } from '../../store/feeds'
import './AddFeed.css';

function AddFeed() {
    const dispatch = useDispatch()
    const history = useHistory();
    const [feedName, setFeedName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            feedName
        }

        await dispatch(postFeed(payload));
        setFeedName('');

        history.push('/');
    }

    return (
        <div className="form-container">
            <div className="form-container__header">Create New Feed</div>
            <div className="form-container__subheader">A private collection of trusted sources you want to read</div>
            <form onSubmit={handleSubmit}>
                <div className="form-container__input-fields">
                    <div className='form-container__label'>Title</div>
                    <input
                        type="text"
                        value={feedName}
                        onChange={(e) => (setFeedName(e.target.value))}
                        required
                        placeholder="Title"
                    />
                </div>
                <div className="form__btn">
                    <button type="submit" id="signup-btn">Save</button>
                </div>
            </form>
        </div>
    )
}


export default AddFeed
