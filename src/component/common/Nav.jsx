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
            <button className='nav-login'>Login</button>
        </nav>
    );
}

export default Nav;