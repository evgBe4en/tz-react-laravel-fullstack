import React from 'react'

const NavBar = () => {
    return (
        <>
            <div className='nav-container'>
                <h2 className='nav-logo'>LOGO</h2>
                <div className='nav-links'>
                    <a className='nav-link'>Main</a>
                    <a className='nav-link'>Events</a>
                    <a className='nav-link checked'>Calendar</a>
                    <a className='nav-link'>FAQ</a>
                </div>
            </div>
        </>
    )
}
export default NavBar
