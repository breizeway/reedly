import React, { useState, useEffect } from "react";

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
                <div className='add-source__add'>
                    <div className='add-source__text'>Add new source...</div>
                    <form className='add-source__form'>
                        <div className='add-source__input-container'>
                            <div className='add-source__add-icon'>
                                <i className='' />
                            </div>
                            <input
                                type='text'

                            ></input>
                            <button>Add</button>
                        </div>
                    </form>
                </div>
                <div className="add-source__grid-container">
                    <div className="add-source__featured-item">item 1</div>
                    <div className="add-source__featured-item">item 2</div>
                    <div className="add-source__featured-item">item 3</div>
                    <div className="add-source__featured-item">item 4</div>
                    <div className="add-source__group-container-heading">Industries</div>
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
