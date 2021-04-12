import React from 'react';

import '../assets/css/pages/details.css'

function Details(props) {
    return (
        <div>
            <div>
                <div>
                    <p>Title: </p>
                    <p>Link: </p>
                    <p>Number of Visitors: </p>
                    <p>Last Visited: </p>
                </div>
                <div>
                    graph
                </div>
            </div>
            <input type="text" placeholder='Input Date or Month' />
            <table>
                <thead>
                    <tr>
                        <th>Date & Time Viewed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Details;