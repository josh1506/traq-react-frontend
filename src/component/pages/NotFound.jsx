import React from 'react';
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'

import notFoundPhoto from '../assets/img/not-found.jpg'

const animateButton = {
    visible: {
        opacity: 1,
        transition: { duration: 2, delay: 2.5 }
    },
    onHover: {
        scale: 1.03,
        transition: { yoyo: Infinity }
    }
}

function NotFound(props) {
    return (
        <div className='photo-content-page'>
            <img src={notFoundPhoto} alt="not-found"/>
                <motion.button
                    variants={animateButton}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    whileHover='onHover'
                    style={{ border: 'none', backgroundColor: 'rgba(0,0,0,0)', marginBottom: 50 }}
                >
                    <Link to='/' className='go-back-link-button'>Go back to homepage</Link>
                </motion.button>
        </div>
    );
}

export default NotFound;