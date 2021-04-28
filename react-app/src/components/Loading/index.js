import React from 'react'

import './Loading.css'


const Loading = ({ size='50px' }) => {
    return (
        <div
            className='loading'
            style={{
                fontSize: size
            }}
        >
            <i className='fas fa-circle-notch' />
        </div>
    )
}


export default Loading
