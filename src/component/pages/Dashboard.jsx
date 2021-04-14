import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'

import CreateUrlModal from '../common/CreateUrlModal';
import '../assets/css/pages/dashboard.css'
import DeleteUrlModal from './../common/DeleteUrlModal';

const animateTableContainer = {
    hidden: { y: '10vh', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0 }
}

const animateSearchInput = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: '60%', opacity: 1, transition: { delay: 1, duration: 1 } },
    exit: { width: 0, opacity: 0 }
}

const animateChartList = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 2, duration: 1 } },
    exit: { opacity: 0 }
}

function Dashboard(props) {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const data = [
        {
            "name": "Jan 1",
            "YouTube": 32,
            "Facebook": 23,
            "amt": 2400
        },
        {
            "name": "Jan 2",
            "YouTube": 12,
            "Facebook": 13,
            "amt": 2210
        },
        {
            "name": "Jan 3",
            "YouTube": 18,
            "Facebook": 52,
            "amt": 2290
        },
        {
            "name": "Jan 4",
            "YouTube": 3,
            "Facebook": 36,
            "amt": 2000
        },
        {
            "name": "Jan 5",
            "YouTube": 34,
            "Facebook": 17,
            "amt": 2181
        },
        {
            "name": "Jan 6",
            "YouTube": 16,
            "Facebook": 25,
            "amt": 2500
        },
        {
            "name": "Jan 7",
            "YouTube": 25,
            "Facebook": 23,
            "amt": 2100
        }
    ]

    return (
        <div className='dashboard-container'>
            <div className='dashbaord-status-container'>
                <motion.div
                    variants={animateChartList}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className='dashboard-status-list'
                >
                    <motion.p whileHover={{ scale: 1.2 }} style={{ cursor: 'default' }}>asd</motion.p>
                    <motion.p whileHover={{ scale: 1.2 }} style={{ cursor: 'default' }}>asd</motion.p>
                    <motion.p whileHover={{ scale: 1.2 }} style={{ cursor: 'default' }}>asd</motion.p>
                    <motion.p whileHover={{ scale: 1.2 }} style={{ cursor: 'default' }}>asd</motion.p>
                    <motion.p whileHover={{ scale: 1.2 }} style={{ cursor: 'default' }}>asd</motion.p>
                </motion.div>
                <div className='dashboard-graph-container'>
                    <div className="dashboard-button">
                        <FontAwesomeIcon
                            icon={faPlusCircle}
                            size='lg'
                            className='table-create-icon'
                            onClick={() => setShowCreateModal(true)}
                        />
                    </div>
                    <div className='dashboard-chart'>
                        <AreaChart width={730} height={250} data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#ff6b35" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="YouTube" stroke="#ff6b35" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="Facebook" stroke="#8884d8" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>
                    </div>
                </div>
            </div>
            <motion.input
                variants={animateSearchInput}
                initial='hidden'
                animate='visible'
                exit='exit'
                type="text"
                name="" id=""
                className='search-input'
                placeholder='Input link title'
            />
            <motion.div
                variants={animateTableContainer}
                initial='hidden'
                animate='visible'
                exit='exit'
                className='dashboard-table-container'
            >
                <table className='dashboard-table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Link</th>
                            <th>Total Visitors</th>
                            <th>Last Viewed</th>
                            <th style={{ minWidth: '15px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ASDASDASDASDASDASDASDASDASD</td>
                            <td>asdasdasdasdasdasdasdasdasdasdasdasdasdasd</td>
                            <td>123</td>
                            <td>asd</td>
                            <td>
                                <FontAwesomeIcon icon={faTrashAlt} size='lg' className='table-delete-icon' onClick={() => setShowDeleteModal(true)} />
                            </td>
                        </tr>
                        <tr>
                            <td>ASD</td>
                            <td>asd</td>
                            <td>123</td>
                            <td>asd</td>
                            <td>
                                <FontAwesomeIcon icon={faTrashAlt} size='lg' className='table-delete-icon' onClick={() => setShowDeleteModal(true)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </motion.div>
            <CreateUrlModal showModal={showCreateModal} onChangeShowModal={setShowCreateModal} />
            <DeleteUrlModal showModal={showDeleteModal} onChangeShowModal={setShowDeleteModal} />
        </div>
    );
}

export default Dashboard;