import React from "react";

import AddSourceCard from './AddSourceCard'
import './AddSource.css';

function AddSource() {
    const cardTitles = [
        'Advertising',
        'Automotive',
        'Biopharma',
        'Cybersecurity',
        'Energy',
        'Financial Services',
        'Food',
        'Healthcare',
        'Industrials',
        'Media & Entertainment',
        'Medical Devices',
        'Real Estate',
        'Retail',
        'Telecom',
        'Travel & Hostpitality',
    ]

    return (
            <div className="add-source">
                <div>Add new sources</div>
                <div className="grid-container">
                    <div className="featured-item">item 1</div>
                    <div className="featured-item">item 2</div>
                    <div className="featured-item">item 3</div>
                    <div className="featured-item">item 4</div>
                    <div className="group-container-heading">Industries</div>
                    {cardTitles.map((title, i) => (
                        <AddSourceCard
                            title={title}
                            key={i}
                        />
                    ))}
                </div>
            </div>
    )
}

export default AddSource
