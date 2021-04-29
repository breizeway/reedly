import React from 'react'

import './About.css'


const About = () => {
    return (
        <div className='about'>
            <h1>Reedly was made by...</h1>
            <div className='about__person'>
                <div>Tannor Breitigam</div>
                <div className='about__links'>
                    <a
                        className='about__link'
                        href='https://www.tannorbreitigam.com'
                    >
                        <i className='fas fa-address-card' />
                    </a>
                    <a
                        className='about__link'
                        href='https://github.com/breizeway'
                    >
                        <i className='fab fa-github' />
                    </a>
                </div>
            </div>
            <div className='about__person'>
                <div>Sam Hearst</div>
                <div className='about__links'>
                    <a
                        className='about__link'
                        href='https://www.samhearst.com'
                    >
                        <i className='fas fa-address-card' />
                    </a>
                    <a
                        className='about__link'
                        href='https://github.com/sam-hearst'
                    >
                        <i className='fab fa-github' />
                    </a>
                </div>
            </div>
            <div className='about__person'>
                <div>David Ziegler</div>
                <div className='about__links'>
                    <a
                        className='about__link'
                        href='https://www.daveziegler.com'
                    >
                        <i className='fas fa-address-card' />
                    </a>
                    <a
                        className='about__link'
                        href='https://github.com/davezig'
                    >
                        <i className='fab fa-github' />
                    </a>
                </div>
            </div>
            <div className='about__person'>
                <div>James Zrust</div>
                <div className='about__links'>
                    <a
                        className='about__link'
                        href='https://www.jameszrust.com'
                    >
                        <i className='fas fa-address-card' />
                    </a>
                    <a
                        className='about__link'
                        href='https://github.com/Jamiezz'
                    >
                        <i className='fab fa-github' />
                    </a>
                </div>
            </div>
        </div>
    )
}


export default About
