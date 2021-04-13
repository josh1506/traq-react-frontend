import React from 'react';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import img_one from '../assets/img/11000.jpg'
import img_two from '../assets/img/9812.jpg'
import '../assets/css/pages/landing.css'

const animateImageLeft = {
    hidden: {
        x: '-50vw',
        zIndex: -1,
        opacity: 0
    },
    visible: {
        x: 0,
        zIndex: -1,
        opacity: 1,
        transition: { type: 'spring', mass: 2, duration: 1, delay: 0.2 }
    },
    exit: {
        x: '-10vw',
        zIndex: -1,
        opacity: 0
    }
}

const animateTextLeft = {
    hidden: {
        x: '-10vh',
        zIndex: -1,
        opacity: 0
    },
    visible: {
        x: 0,
        zIndex: -1,
        opacity: 1,
        transition: { duration: 3, delay: 5 }
    },
    exit: {
        x: '-10vw',
        zIndex: -1,
        opacity: 0
    }
}

const animateImageRight = {
    hidden: {
        x: '10vw',
        zIndex: -1,
        opacity: 0
    },
    visible: {
        x: 0,
        zIndex: -1,
        opacity: 1,
        transition: { duration: 3, delay: 5 }
    },
    exit: {
        x: '10vw',
        zIndex: -1,
        opacity: 0
    }
}

const animateTextRight = {
    hidden: {
        y: '50vh',
        zIndex: -1,
        opacity: 0
    },
    visible: {
        y: 0,
        zIndex: -1,
        opacity: 1,
        transition: { type: 'spring', mass: 2, duration: 1, delay: 1.7 }
    },
    exit: {
        zIndex: -1,
        opacity: 0
    }
}

const animateButton = {
    hidden: {
        y: '10vh',
        zIndex: -1,
        opacity: 0
    },
    visible: {
        y: '5vh',
        zIndex: 1,
        opacity: 1,
        transition: { duration: 2, delay: 2.5 }
    },
    exit: {
        zIndex: -1,
        opacity: 0
    },
    onHover: {
        scale: 1.03,
        transition: { yoyo: Infinity }
    }
}

function Landing(props) {
    return (
        <div>
            <div className='content-right'>
                <motion.img
                    variants={animateImageLeft}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    src={img_one}
                    alt=""
                    className='dashboard-img'
                />
                <div>
                    <motion.div
                        variants={animateTextRight}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        className='content-message'
                    >
                        <h1>Traq</h1>
                        <p>
                            Manage and keep track your url's
                            now by signing up for Free
                        </p>
                    </motion.div>
                    <motion.button
                        variants={animateButton}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        whileHover='onHover'
                        style={{ border: 'none', backgroundColor: 'rgba(0,0,0,0)' }}
                    >
                        <Link to='/login' className='content-button'>
                            Login/Signup for Free
                        </Link>
                    </motion.button>
                </div>
            </div>
            <div className='content-left'>
                <motion.img variants={animateImageRight}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    src={img_two} alt="" className='dashboard-img'
                />
                <div>
                    <motion.p variants={animateTextLeft}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                    >
                        Measure the success of your marketing
                        campaigns by create your own tracking
                        URL which helps you track the number
                        of visitors opened your link.
                    </motion.p>
                </div>
            </div>
        </div>
    );
}

export default Landing;