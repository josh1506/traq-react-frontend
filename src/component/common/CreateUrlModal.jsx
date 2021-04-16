import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'

import route from '../route/traq'
import '../assets/css/common/modal.css'
import { connect } from 'react-redux';

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


function CreateUrlModal(props) {
    const [urlData, setUrlData] = useState({ title: '', link: '' })
    const [error, setError] = useState({ title: [], link: [], data: {}, error: '', status: false })

    const handleSubmit = async () => {
        route.post('url_tracker/url', urlData, { headers: { Authorization: `Token ${props.auth}` } })
            .then(() => props.onChangeShowModal(false))
            .catch(data => setError(data.response.data))
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
                        className='modal-container'>
                        <motion.form
                            variants={animateFormContainer}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            action="" className='modal-form-container'>
                            {error.error && <motion.p
                                className='modal-error'
                                variants={animateModalError}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                            >{error.error}</motion.p>}
                            <label htmlFor="title">Title</label>
                            {error.title && <motion.p
                                className='modal-error'
                                variants={animateModalError}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                            >{error.title[0]}</motion.p>}
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder='Title'
                                value={urlData.title}
                                onChange={e => setUrlData({ ...urlData, title: e.target.value })}
                            />
                            <label htmlFor="link">Link</label>
                            {error.link && <motion.p
                                className='modal-error'
                                variants={animateModalError}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                            >{error.link[0]}</motion.p>}
                            <input
                                type="text"
                                name="link"
                                id="link"
                                placeholder='Link'
                                value={urlData.link}
                                onChange={e => setUrlData({ ...urlData, link: e.target.value })}
                            />
                        </motion.form>
                        <div className='modal-button-container'>
                            <motion.button
                                variants={animateButton}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                whileHover='onHover'
                                style={{ backgroundColor: '#ffa69e' }}
                                onClick={() => {
                                    setUrlData({ title: '', link: '' })
                                    props.onChangeShowModal(false)
                                }}>Cancel</motion.button>
                            <motion.button
                                variants={animateButton}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                whileHover='onHover'
                                onClick={() => handleSubmit()}>Create</motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>}
        </AnimatePresence>
    );
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(CreateUrlModal);