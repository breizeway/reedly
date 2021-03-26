import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const card = () => {
    const dispatch = useDispatch()
    const sources = useSelector(state => state.sources)
    return (
        <div className="card-container">
            <div className="card">
                <div className="card-header">Financial Services</div>
                <div className="card-footer">Featuring Calculated Risk</div>
            </div>
        </div>
    )
}