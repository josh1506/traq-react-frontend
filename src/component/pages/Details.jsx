import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'

import route from '../route/traq'
import '../assets/css/pages/dashboard.css'
import DeleteUrlModal from './../common/DeleteUrlModal';
import { connect } from 'react-redux';

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

const animateButton = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: { duration: 2, delay: 2.5 }
    },
    exit: {
        opacity: 0
    },
    onHover: {
        scale: 1.03,
        transition: { yoyo: Infinity }
    }
}

function Details(props) {
    var num = 0
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [error, setError] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [urlDetails, setUrlDetails] = useState({
        "title": "",
        "link": "",
        "short_url": "",
        "total_visitors": 0,
        "viewer_list": []
    })

    const [graphList, setGraphList] = useState([])
    const [graphTitle, setGraphTitlte] = useState([])
    const [graphData, setGraphData] = useState([
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
    ])
    const handleGraphTitle = () => {
        // Object.keys(graphData).filter(title => title !== 'name')
        const graphTitleList = []
        const titleList = graphData.map(data => Object.keys(data))
        titleList.map(title => title.filter(data => data !== 'name')
            .map(data => graphTitleList.includes(data) ? '' : graphTitleList.push(data)))
        setGraphTitlte(graphTitleList)
    }

    const getData = async () => {
        const user = props.auth || localStorage.getItem('auth_token')

        const urlID = props.match.params.id
        await route.get(`url_tracker/url/${urlID}`, { headers: { 'Authorization': `Token ${user}` } })
            .then(({ data }) => {
                setError(false)
                setUrlDetails(data.data)
                setGraphList(data.data.graph_list)
                setGraphData(data.data.graph_list.date)
                handleGraphTitle()
            })
            .catch(() => setError(true))
    }

    useEffect(() => {
        const user = props.auth || localStorage.getItem('auth_token')
        if (!user) props.history.replace('/')
    }, [props.auth])

    useEffect(() => {
        getData()
    }, [])

    const handleCloseModal = () => {
        setShowDeleteModal(false)
        getData()
    }

    if (error) return <div className='dashboard-container'><p>Not found</p></div>

    const newData = urlDetails.viewer_list && searchValue ? urlDetails.viewer_list.filter(viewer => viewer.date_viewed.toLowerCase().includes(searchValue) ? viewer : '') : urlDetails.viewer_list

    return (
        <div className='dashboard-container'>
            {urlDetails.title && <div className='dashbaord-status-container'>
                <motion.button
                    variants={animateButton}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    whileHover='onHover'
                    style={{ 
                        border: 'none', 
                        backgroundColor: 'rgba(0,0,0,0)', 
                        position: 'absolute',
                        top: 90,
                        left: 100
                    }}
                >
                    <Link to='/dashboard' className='back-button'>Go back</Link>
                </motion.button>
                <motion.div
                    variants={animateChartList}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className='dashboard-status-list'
                    style={{ fontSize: 15, height: 270 }}
                >

                    <p>Title: 
                        <p style={{color: '#8884d8'}}>
                            {urlDetails.title}
                        </p>
                    </p>
                    <p>Link: 
                        <p style={{color: '#8884d8'}}>
                            {urlDetails.link}
                        </p>
                    </p>
                    <p>Trach url: 
                        <p style={{color: '#8884d8'}}>
                        https://josh1506.github.io/traq-react-frontend/url/{urlDetails.short_url}
                        </p>
                    </p>
                    <p>Number of Visitors: 
                        <p style={{color: '#8884d8'}}>
                            {urlDetails.total_visitors}
                        </p>
                    </p>
                    <p>Last Visited: 
                        <p style={{color: '#8884d8'}}>
                            {urlDetails.viewer_list.length > 0 ? urlDetails.viewer_list[0].date_viewed : 'No visited yet'}
                        </p>
                    </p>
                </motion.div>
                <div className='dashboard-graph-container'>
                    <div className="dashboard-button">
                        <button
                            className='dashboard-button-filter'
                            onClick={() => setGraphData(graphList.date)}>Date</button>
                        <button
                            className='dashboard-button-filter'
                            onClick={() => setGraphData(graphList.month)}>Month</button>
                        <button
                            className='dashboard-button-filter'
                            style={{ marginRight: 15 }}
                            onClick={() => setGraphData(graphList.year)}>Year</button>
                        <FontAwesomeIcon
                            className='table-delete-icon'
                            size='lg'
                            icon={faTrashAlt}
                            onClick={() => setShowDeleteModal(true)} />
                    </div>
                    <div className='dashboard-chart'>
                        <AreaChart width={730} height={250} data={graphData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            {graphTitle.map(title => {
                                num += 1
                                return <Area
                                    key={`${title}${num}`}
                                    type="monotone"
                                    dataKey={title}
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill="url(#colorUv)"
                                />
                            })}
                        </AreaChart>
                    </div>
                </div>
            </div>}
            {urlDetails.viewer_list.length > 0 ?
                <React.Fragment>
                    <motion.input
                        variants={animateSearchInput}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        type="text"
                        className='search-input'
                        placeholder='Input Date, Time, or Month'
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
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
                                    <th>Date & Time Viewed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newData.map(viewer =>
                                    <tr key={viewer.date_viewed}>
                                        <td>{viewer.date_viewed}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </motion.div>
                </React.Fragment> : <p className='dashboard-table-empty'>No visitors yet</p>}
            <DeleteUrlModal
                {...props}
                showModal={showDeleteModal}
                onChangeShowModal={handleCloseModal}
                onSelectItem={urlDetails}
            />
        </div>
    );
}

const mapStateToProps = ({ auth }) => {
    return { auth }
}

export default connect(mapStateToProps)(Details);