import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getFeeds } from "../../../store/feeds"
import { updateFeedSource } from "../../../store/feed_details"
import "./AddSourceCard.css"

function ChooseFeedDropDown({ source, setShowDropDown }) {
    const history = useHistory();
    const dispatch = useDispatch()
    const [feed, setFeed] = useState('default')
    const feeds = useSelector(state => state.feeds);
    const feedsArr = Object.values(feeds);

    async function submit(e) {
        e.preventDefault();

        const payload = {
            feedId: feed,
            source: source
        }

        console.log(payload);

        await dispatch(updateFeedSource(payload))


        history.push("/sources/add");
        return setShowDropDown(false); 
    }

    useEffect(() => {
        async function getAllFeeds() {
            await dispatch(getFeeds())
        }
        getAllFeeds();
    }, [dispatch])

    return (
        <div className="feed-dropdown-container dropdown-prevent-close">
            <form onSubmit={submit} className="feed-dropdown__form">
                <div className="feed-dropdown__form-container">
                    <div className="feed-dropdown__title">
                        <span>Please select a feed for the source</span>
                    </div>
                    <div className="feed-dropdown__select">
                        <select
                            value={feed}
                            onChange={e => setFeed(e.target.value)}
                            placeholder='feed'
                        >
                            <option value='default' className='add-source__default-option'>-- choose feed --&nbsp;</option>
                            {feedsArr.map(feed => (
                                <option key={feed.id} value={feed.id}>{feed.feed_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="feed-dropdown__btn">
                        <button className="feed-dropdown__add">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default ChooseFeedDropDown
