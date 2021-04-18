import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusCircle, faMinus } from '@fortawesome/free-solid-svg-icons'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'

import CreateUrlModal from '../common/CreateUrlModal';
import DeleteUrlModal from './../common/DeleteUrlModal';
import route from '../route/traq'
import '../assets/css/pages/dashboard.css'
import { Link } from 'react-router-dom';
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

const animateUrlCopy = {
    visible: { opacity: 1, transition: { duration: 3 } },
    onHover: { scale: 1.02, transition: { duration: 0.3 } },
    onTap: { opacity: [0.1, 1], transition: { duration: 0.3 } }
}

function Dashboard(props) {
    var num = 0
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedUrl, setSelectedUrl] = useState({ link: "", title: "", total_visitors: 0 })

    const [error, setError] = useState(false)
    const [urlList, setUrlList] = useState([])
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
        const graphTitleList = []
        var colors = [
            "#8884d8",
            "#82ca9d",
            "#e63946",
            "#e56b6f",
            "#555b6e",
            "#e9c46a",
            "#c1121f",
            "#5a189a",
            "#585123",
            "#06d6a0",
        ];

        const titleList = graphData.map(data => Object.keys(data))
        titleList.map(title => title.filter(data => data !== 'name')
            .map(data => graphTitleList.includes(data) ? '' : graphTitleList.push(data)))

        const newGraphTitle = graphTitleList.map((title, index) => { return { title, color: colors[index] } })
        setGraphTitlte(newGraphTitle)
    }

    const getData = async () => {
        const user = localStorage.getItem('auth_token')

        await route.get('url_tracker/url', { headers: { Authorization: `Token ${user}` } })
            .then(({ data }) => {
                console.log(data)
                setError(false)
                setUrlList(data.data)
                setGraphList(data.graph_list)
                setGraphData(data.graph_list.date)
                handleGraphTitle()
            })
    }

    useEffect(() => {
        const user = props.auth || localStorage.getItem('auth_token')
        if (!user) props.history.replace('/')
    }, [props.auth])

    useEffect(() => {
        if (!localStorage.getItem('auth_token')) props.history.replace('login')
        getData()
    }, [])

    const handleCloseModal = () => {
        setShowCreateModal(false)
        setShowDeleteModal(false)
        getData()
    }

    if (error) return <div className='dashboard-container'><p>Not found</p></div>

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
                    {urlList.map((url, index) => {
                        var colors = [
                            "#8884d8",
                            "#82ca9d",
                            "#e63946",
                            "#e56b6f",
                            "#555b6e",
                            "#e9c46a",
                            "#c1121f",
                            "#5a189a",
                            "#585123",
                            "#06d6a0",
                        ]

                        return <motion.p whileHover={{ scale: 1.1, x: 15 }} style={{ cursor: 'default', color: colors[index] }}>
                            <FontAwesomeIcon
                                icon={faMinus}
                                size='xs'
                                color={colors[index]}
                                style={{ marginRight: 5 }}
                                className='table-create-icon'
                                onClick={() => setShowCreateModal(true)}
                            />{url.title}
                        </motion.p>
                    })}
                </motion.div>
                <div className='dashboard-graph-container'>
                    <div className="dashboard-button">
                        <button className='dashboard-button-filter' onClick={() => setGraphData(graphList.date)}>Date</button>
                        <button className='dashboard-button-filter' onClick={() => setGraphData(graphList.month)}>Month</button>
                        <button className='dashboard-button-filter' onClick={() => setGraphData(graphList.year)}>Year</button>
                        <FontAwesomeIcon
                            icon={faPlusCircle}
                            size='lg'
                            className='table-create-icon'
                            onClick={() => setShowCreateModal(true)}
                        />
                    </div>
                    <div className='dashboard-chart'>
                        <AreaChart width={730} height={250} data={graphData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                {graphTitle.map(graph => {
                                    num += 1
                                    return <linearGradient id={graph.title} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={graph.color} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={graph.color} stopOpacity={0} />
                                    </linearGradient>
                                })}
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            {graphTitle.map(graph => {
                                num += 1
                                return <Area
                                    key={`${graph.title}${num}`}
                                    type="monotone"
                                    dataKey={graph.title}
                                    stroke={graph.color}
                                    fillOpacity={1}
                                    fill={`url(#${graph.title})`}
                                />
                            })}
                        </AreaChart>
                    </div>
                </div>
            </div>
            {urlList.length > 0 ? <React.Fragment>
                <motion.input
                    variants={animateSearchInput}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    type="text"
                    className='search-input'
                    placeholder='Input Title'
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
                                <th>Track Link</th>
                                <th>Total Visitors</th>
                                <th>Last Viewed</th>
                                <th style={{ minWidth: '15px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {urlList.map(url => url.title &&
                                <tr key={url.title}>
                                    <td>
                                        <Link to={`/dashboard/${url.id}`}>
                                            {url.title.substring(0, 8)}
                                            {url.title.length > 8 ? '...' : ''}
                                        </Link>
                                    </td>
                                    <td>
                                        <a href={url.link} target='_blank'>
                                            Visit page
                                            </a>
                                    </td>
                                    <td>
                                        <motion.p
                                            variants={animateUrlCopy}
                                            whileHover='onHover'
                                            whileTap='onTap'
                                            animate='visible'
                                            className='url-link'
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => navigator.clipboard.writeText(`http://localhost:3000/url/${url.short_url}`)}
                                        >
                                            http://localhost:3000/url/{url.short_url}
                                            <span class="tooltip-message">Click to copy</span>
                                        </motion.p>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{url.total_visitors}</td>
                                    <td>on going</td>
                                    <td>
                                        <FontAwesomeIcon
                                            className='table-delete-icon'
                                            size='lg'
                                            icon={faTrashAlt}
                                            onClick={() => {
                                                setSelectedUrl(url)
                                                setShowDeleteModal(true)
                                            }} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>
            </React.Fragment> : <p className='dashboard-table-empty'>Start create your tacker now.</p>}
            <CreateUrlModal showModal={showCreateModal} onChangeShowModal={handleCloseModal} />
            <DeleteUrlModal
                showModal={showDeleteModal}
                onChangeShowModal={handleCloseModal}
                onSelectItem={selectedUrl}
                onChangeSelect={setSelectedUrl}
            />
        </div>
    );
}

const mapStateToProps = ({ auth }) => {
    return { auth }
}

export default connect(mapStateToProps)(Dashboard);