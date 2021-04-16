import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'

import route from '../route/traq'
import '../assets/css/pages/dashboard.css'

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

function Details(props) {
    var num = 0
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
        // Object.keys(graphData).filter(title => title !== 'name')
        const graphTitleList = []
        const titleList = graphData.map(data => Object.keys(data))
        titleList.map(title => title.filter(data => data !== 'name')
            .map(data => graphTitleList.includes(data) ? '' : graphTitleList.push(data)))
        setGraphTitlte(graphTitleList)
    }

    useEffect(() => {
        const getData = async () => {
            const urlID = props.match.params.id
            await route.get(`url_tracker/url/${urlID}`)
                .then(({ data }) => {
                    setError(false)
                    setUrlDetails(data.data)
                    setGraphList(data.data.graph_list)
                    setGraphData(data.data.graph_list.date)
                    handleGraphTitle()
                })
                .catch(() => setError(true))
        }
        getData()
    }, [])

    if (error) return <div className='dashboard-container'><p>Not found</p></div>

    return (
        <div className='dashboard-container'>
            {urlDetails.title && <div className='dashbaord-status-container'>
                <motion.div
                    variants={animateChartList}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className='dashboard-status-list'
                    style={{ fontSize: 15 }}
                >
                    <p>Title: {urlDetails.title}</p>
                    <p>Link: {urlDetails.link}</p>
                    <p>Trach url: http://localhost:3000/url/{urlDetails.short_url}</p>
                    <p>Number of Visitors: {urlDetails.total_visitors}</p>
                    <p>Last Visited: {urlDetails.viewer_list[0].date_viewed}</p>
                </motion.div>
                <div className='dashboard-graph-container'>
                    <div className="dashboard-button">
                        <button onClick={() => setGraphData(graphList.date)}>Date</button>
                        <button onClick={() => setGraphData(graphList.month)}>Month</button>
                        <button onClick={() => setGraphData(graphList.year)}>Year</button>
                        <button>Delete</button>
                    </div>
                    <div className='dashboard-chart'>
                        <AreaChart width={730} height={250} data={graphData}
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
                            {graphTitle.map(title => {
                                num += 1
                                return <Area
                                    key={`${title}${num}`}
                                    type="monotone"
                                    dataKey={title}
                                    stroke="#ff6b35"
                                    fillOpacity={1}
                                    fill="url(#colorUv)"
                                />
                            })}
                        </AreaChart>
                    </div>
                </div>
            </div>}
            <motion.input
                variants={animateSearchInput}
                initial='hidden'
                animate='visible'
                exit='exit'
                type="text"
                className='search-input'
                placeholder='Input Date or Month'
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
                        {urlDetails.viewer_list.map(viewer =>
                            <tr key={viewer.date_viewed}>
                                <td>{viewer.date_viewed}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}

export default Details;