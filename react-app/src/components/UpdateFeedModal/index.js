import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import "./UpdateFeedModal.css"

function UpdateFeedModal() {
    const dispatch = useDispatch()
    const history = useHistory();
    const { feedId } = useParams();
    const feed = useSelector(state => state.feeds[Number(feedId)]);
    const [ feedName, setFeedName ] = useState(feed.feed_name)

    function updateFeedName(e) {
        setFeedName(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            feed_name: feedName,
            feed_id: feed.id,
        }

        // await dispatch(updateFeed(payload))

        history.push(`/feeds/${feed.id}`)
    }

    if (!feed) {
        return null
    }


    return (
        <div className="form-container">
            <div className="form-container__subheader">Manage</div>
            <div className="form-container__header">{feed.feed_name}</div>
            <form onSubmit={handleSubmit}>
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
