import React, { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion'
import { connect } from 'react-redux'

import img_one from '../assets/img/11000.jpg'
import logo from '../assets/img/Traq_Logo.png'
import { userLogin } from '../app/auth'
import '../assets/css/pages/login.css'


const animateImageLeft = {
    hidden: {
        zIndex: -1,
        opacity: 0
    },
    visible: {
        zIndex: -1,
        opacity: 1,
        transition: { duration: 2 }
    },
    exit: {
        x: '-10vw',
        opacity: 0
    }
}

const animateLogin = {
    hidden: {
        y: '5vw',
        zIndex: -1,
        opacity: 0
    },
    visible: {
        y: 0,
        zIndex: -1,
        opacity: 1,
        transition: { duration: 2, delay: 1.5 }
    },
    exit: {
        x: '10vw',
        opacity: 0
    }
}

const animateFacebook = {
    hidden: {
        zIndex: -1,
        opacity: 0
    },
    visible: {
        zIndex: 1,
        opacity: 1,
        transition: { duration: 2, delay: 3 }
    },
    exit: {
        x: '10vw',
        opacity: 0
    },
    onHover: {
        scale: 1.03,
        transition: { yoyo: Infinity }
    }
}


function Login(props) {
    useEffect(() => {
        if (props.auth) props.history.replace('/dashboard')
    }, [props.auth])

    const responseFacebook = (userData) => {
        props.userLogin(userData)
    }

    return (
        <div className='login-page-container'>
            <motion.img
                variants={animateImageLeft}
                initial='hidden'
                animate='visible'
                exit='exit'
                src={img_one}
                alt=""
                className='login-img'
            />
            <div className='login-container'>
                <motion.div
                    variants={animateLogin}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className='login-container'
                >

                    <img src={logo} alt='Traq_Logo' />
                    <h1>Welcome to Traq</h1>
                    <p>
                        Sign in now to assess and start tracking your audience.
                    </p>
                    <h3>Login/Signup with:</h3>
                </motion.div>
                <motion.div
                    variants={animateFacebook}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    whileHover='onHover'
                    className='facebook-login-container'
                >
                    <FacebookLogin
                        appId="199680755295170"
                        fields="name,email,picture"
                        callback={responseFacebook}
                        cssClass="facebook-login-container"
                        textButton={<FontAwesomeIcon icon={faFacebookF} color='white' size='3x' className='facebook-button' />}
                    />
                </motion.div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ auth }) => {
    return { auth }
}

export default connect(mapStateToProps, { userLogin })(Login);