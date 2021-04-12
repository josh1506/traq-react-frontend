import React from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'

import '../assets/css/pages/dashboard.css'

function Details(props) {
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
                <div>
                    <p>Title: </p>
                    <p>Link: </p>
                    <p>Number of Visitors: </p>
                    <p>Last Visited: </p>
                </div>
                <div className='dashboard-graph-container'>
                    <button>Delete</button>
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
            <input type="text" name="" id="" className='search-input' placeholder='Input Date or Month' />
            <div className='dashboard-table-container'>
                <table className='dashboard-table'>
                    <thead>
                        <tr>
                            <th>Date & Time Viewed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>June 1 2021 8:00 PM</td>
                        </tr>
                        <tr>
                            <td>June 1 2021 8:00 PM</td>
                        </tr>
                        <tr>
                            <td>June 1 2021 8:00 PM</td>
                        </tr>
                        <tr>
                            <td>June 1 2021 8:00 PM</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Details;