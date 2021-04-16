import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'

import route from '../route/traq'
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
        transition: { duration: 1, delay: 0.5 }
    },
    exit: {
        opacity: 0
    },
    onHover: {
        scale: 1.03,
        transition: { yoyo: Infinity }
    }
}

const animateModalBackground = {
    hidden: {
        zIndex: 1,
        opacity: 0
    },
    visible: {
        zIndex: 1,
        opacity: 1,
    },
    exit: {
        zIndex: 1,
        opacity: 0,
        transition: { delay: 0.2 }
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

const animateModalError = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
}

function DeleteUrlModal(props) {
    const [error, setError] = useState(false)

    const handleSubmit = async () => {
        await route.delete(`url_tracker/url/${props.onSelectItem.id}`)
            .then(() => props.onChangeShowModal(false))
            .catch(() => setError(true))
    }

    return (
        <AnimatePresence exitBeforeEnter>
            {props.showModal && <motion.div
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
                        className='modal-container'
                    >
                        <motion.div>
                            {error && <motion.p
                                className='modal-error'
                                variants={animateModalError}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                            >Something went wrong</motion.p>}
                            <p style={{ marginBottom: 40, marginTop: 20 }}>Are you sure you want to delete this?</p>
                        </motion.div>
                        <div className='modal-button-container'>
                            <motion.button
                                variants={animateButton}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                whileHover='onHover'
                                onClick={() => {
                                    props.onChangeShowModal(false)
                                    props.onChangeSelect({ link: "https://twitter.com", title: "Twitter", total_visitors: 0 })
                                }}>Cancel</motion.button>
                            <motion.button
                                variants={animateButton}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                whileHover='onHover'
                                style={{ backgroundColor: '#ffa69e' }}
                                onClick={() => handleSubmit()}>Delete</motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>}
        </AnimatePresence>
    );
}

export default DeleteUrlModal;