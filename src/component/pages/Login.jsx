import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import FacebookLogin from 'react-facebook-login';

import img_one from '../assets/img/11000.jpg'
import logo from '../assets/img/Traq_Logo.png'
import '../assets/css/pages/login.css'

function Login(props) {
    const responseFacebook = (response) => {
        console.log(response);
    }

    return (
        <div className='login-page-container'>
            <img src={img_one} alt="" className='login-img' />
            <div className='login-container'>
                <img src={logo} alt='Traq_Logo' />
                <h1>Welcome to Traq</h1>
                <p>
                    Sign in now to assess and start tracking your audience.
                </p>
                <h3>Login/Signup with:</h3>
                <FacebookLogin
                    appId="199680755295170"
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="facebook-login-container"
                    textButton={<FontAwesomeIcon icon={faFacebookF} color='white' size='3x' className='facebook-button' />}
                />
            </div>
        </div>
    );
}

export default Login;