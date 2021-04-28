import React from 'react'
import { useHistory } from 'react-router-dom'

import './PageNotFound.css'


const PageNotFound = () => {
    const history = useHistory()

    return (
        <div className='page-not-found'>
            <h1>404</h1>
            <h2>The page you are looking for does not exist.</h2>
            <div
                className='page-not-found__back'
                onClick={() => history.go(-1)}
            >
                <div className='page-not-found__back-icon'>
                    <i className='fas fa-angle-left' />&nbsp;
                </div>
                <div className='page-not-found__back-text'>Go Back</div>
            </div>
        </div>
    )
}


export default PageNotFound
