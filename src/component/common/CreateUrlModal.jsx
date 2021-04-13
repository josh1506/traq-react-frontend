import React from 'react';
import { motion } from 'framer-motion'

import '../assets/css/common/modal.css'

const animateButton = {
    hidden: {
        y: '3vh',
        zIndex: -1,
        opacity: 0
    },
    visible: {
        y: '0vh',
        zIndex: 1,
        opacity: 1,
        transition: { duration: 1, delay: 1.2 }
    },
    exit: {
        opacity: 0
    },
    onHover: {
        scale: 1.03,
        transition: { yoyo: Infinity }
    }
}

const animateFormContainer = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: { duration: 1, delay: 0.8 }
    },
    exit: {
        zIndex: -1,
        opacity: 0
    },
}

const animateModalBackground = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
    },
    exit: {
        zIndex: -1,
        opacity: 0
    },
}

const animateModalContainer = {
    hidden: {
        y: '-100vh',
        opacity: 0
    },
    visible: {
        y: '0vh',
        opacity: 1,
        transition: { type: 'spring', duration: 1 }
    },
    exit: {
        zIndex: -1,
        y: '100vh',
        opacity: 0
    },
}

function CreateUrlModal(props) {
    return (
        <motion.div
            variants={animateModalBackground}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='modal-background'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <motion.div
                    variants={animateModalContainer}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className='modal-container'>
                    <motion.form
                        variants={animateFormContainer}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        action="" className='modal-form-container'>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" placeholder='Title' />
                        <label htmlFor="link">Link</label>
                        <input type="text" name="link" id="link" placeholder='Link' />
                    </motion.form>
                    <div className='modal-button-container'>
                        <motion.button
                            variants={animateButton}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            whileHover='onHover'
                            style={{ backgroundColor: '#ffa69e' }}
                            onClick={() => console.log('click')}>Cancel</motion.button>
                        <motion.button
                            variants={animateButton}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            whileHover='onHover'
                            onClick={() => console.log('click')}>Create</motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default CreateUrlModal;