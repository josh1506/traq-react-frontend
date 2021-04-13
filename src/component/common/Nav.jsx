import React from 'react';
import { Link } from 'react-router-dom'

import logo from '../assets/img/Traq_Logo.png'
import '../assets/css/common/nav.css'

function Nav(props) {
    return (
        <nav className='nav-container'>
            <Link to='/'>
                <img src={logo} alt="Traq_Logo" className='nav-logo' />
            </Link>
            <Link to='/login' className='nav-button'>
                Login/Signup
            </Link>
        </nav>
    );
}

export default Nav;