import React, { useState } from "react";
import "../SideBar.css"

const SideBarFeed = ({ feed }) => {
    const [showSources, setShowSources] = useState(false)


    return (
        <>
            <div className="sidebar__feed" key={feed.id}
                onClick={() => setShowSources(!showSources)}
            >
                <div className="sidebar__feed-name">{feed.feed_name}</div>
            </div>
            <div className="sidebar__source-container">
                {showSources && feed.sources.map(source => (
                    <div>{source.alt_name}</div>
                ))}
            </div>
        </>
    )
}

export default SideBarFeed
