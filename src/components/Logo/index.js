import React from 'react'
import Tilt from 'react-parallax-tilt'
import brain from './brain.png'
import './logo.css'

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt>
                <div className="br2 shadow-2 pa3" style={{ height: '150px', width: '150px' }}>
                    <img alt="logo" src={brain} style={{paddingTop: '5px'}}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo
