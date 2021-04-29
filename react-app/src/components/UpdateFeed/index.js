import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { updateFeed } from "../../store/feeds"
import { removeActive } from '../../store/modal'
import "./UpdateFeed.css"

function UpdateFeed() {
    const dispatch = useDispatch()
    const history = useHistory();
    const { feedId } = useParams();
    const feed = useSelector(state => state.feeds[Number(feedId)]);
    const [ feedName, setFeedName ] = useState(feed.feed_name)
    const modal = useSelector(state => state.modal);

    function updateFeedName(e) {
        setFeedName(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            feed_name: feedName,
            feed_id: feed.id,
        }

        await dispatch(updateFeed(payload))
        dispatch(removeActive(modal.active))

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
                    <button type="button" id="cancel-btn"
                    onClick={() => (dispatch(removeActive(modal.active)))}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateFeed;
