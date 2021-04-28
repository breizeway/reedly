import React from 'react'
import { useHistory } from 'react-router-dom'

import './ServerError.css'


const ServerError = ({ error }) => {
    const history = useHistory()

    const ErrorText = () => {
        switch (error) {
            case 404: return (
                <>
                    <h1>404</h1>
                    <h2>The resource you requested is unavailable.</h2>
                </>
            )
            default: return (
                <>
                    <h1>500</h1>
                    <h2>The server encountered an unexpected problem, which prevented it from fulfilling the request.</h2>
                </>
            )
        }
    }

    return (
        <div className='server-error'>
            <ErrorText />
            <div
                className='server-error__back'
                onClick={() => history.go(-1)}
            >
                <div className='server-error__back-icon'>
                    <i className='fas fa-angle-left' />&nbsp;
                </div>
                <div className='server-error__back-text'>Go Back</div>
            </div>
        </div>
    )
}


export default ServerError
