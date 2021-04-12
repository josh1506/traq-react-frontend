import React from 'react';

import img_one from '../assets/img/11000.jpg'
import logo from '../assets/img/Traq_Logo.png'
import '../assets/css/pages/login.css'

function Login(props) {
    return (
        <div>
            <img src={img_one} alt="" height='200' />
            <div>
                <img src={logo} alt='Traq_Logo' height='100' />
                <p>

                </p>
                <h3>Login/Signup with:</h3>
                <button>F</button>
            </div>
        </div>
    );
}

export default Login;