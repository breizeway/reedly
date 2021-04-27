import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import "./UpdateFeedModal.css"

function UpdateFeedModal() {
    const { feedId } = useParams();
    const feed = useSelector(state => state.feeds[Number(feedId)]);
    const [ feedName, setFeedName ] = useState(feed.feed_name)

    function updateFeedName(e) {
        setFeedName(e.target.value)
    }

    if (!feed) {
        return null
    }


    return (
        <div className="form-container">
            <div className="form-container__subheader">Manage</div>
            <div className="form-container__header">{feed.feed_name}</div>
            <form>
                <div className="form-container__input-fields">
                    <span className='form-container__label'>Title</span>
                    <input
                        type="text"
                        name="feed-name"
                        required
                        value={feedName}
                        onChange={updateFeedName}
                    />
                </div>
                <div className="form__btn">
                    <button type="submit" id="signup-btn">Save</button>
                    <button type="button" id="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateFeedModal;
