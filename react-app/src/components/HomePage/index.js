import React from "react";
import './HomePage.css';

function HomePage() {
    return (
        <>
            <div>This is the home page.</div>
            <div className="homepage__feeds-container">
            </div>
            <div className="featured-grid-container">
                <div className="featured-item featured-item-1">item 1</div>
                <div className="featured-item featured-item-2">item 2</div>
                <div className="featured-item featured-item-3">item 3</div>
                <div className="featured-item featured-item-4">item 4</div>
            </div>

            <div className="homepage__feeds-container">
            </div>
            <div className="featured-grid-container">
                <div className="featured-item featured-item-1">item 1</div>
                <div className="featured-item featured-item-2">item 2</div>
                <div className="featured-item featured-item-3">item 3</div>
                <div className="featured-item featured-item-4">item 4</div>
            </div>
        </>
    )
}

export default HomePage
