import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { postFeed } from '../../../../store/feeds'
// import './AddFeedModalContent.css';

function AddFeedModalContent() {
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
            <form onSubmit={handleSubmit}>
                <div className="form__input-fields">
                    <label>Title</label>
                    <input
                        type="text"
                        value={feedName}
                        onChange={(e) => (setFeedName(e.target.value))}
                        required
                        placeholder="Feed Name"
                    />
                </div>
                <div className="form__btn">
                    <button type="submit" id="signup-btn">Save</button>
                </div>
            </form>
        </div>
    )
}


export default AddFeedModalContent
