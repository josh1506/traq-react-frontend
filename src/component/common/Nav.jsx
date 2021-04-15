import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { userLogout } from '../app/auth'
import logo from '../assets/img/Traq_Logo.png'
import '../assets/css/common/nav.css'

function Nav(props) {
    return (
        <nav className='nav-container'>
            <Link to='/'>
                <img src={logo} alt="Traq_Logo" className='nav-logo' />
            </Link>
            {!props.auth ?
                <Link to='/login' className='nav-button'>
                    Login/Signup
                </Link> :
                <button
                    className='nav-button'
                    onClick={() => props.userLogout()}
                    style={{ border: 'none', cursor: 'pointer' }}>
                    Logout
                </button>
            }
        </nav>
    );
}

const mapStateToProps = ({ auth }) => {
    return { auth }
}

export default connect(mapStateToProps, { userLogout })(Nav);