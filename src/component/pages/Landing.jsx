import React from 'react';
import { Link } from 'react-router-dom'

import img_one from '../assets/img/11000.jpg'
import img_two from '../assets/img/9812.jpg'
import '../assets/css/pages/landing.css'

function Landing(props) {
    return (
        <div>
            <div className='content-right'>
                <img src={img_one} alt="" className='dashboard-img' />
                <div>
                    <div className='content-message'>
                        <h1>Traq</h1>
                        <p>
                            Manage and keep track your url's
                            now by signing up for Free
                        </p>
                    </div>
                    <Link to='/login' className='content-button'>Login/Signup for Free</Link>
                </div>
            </div>
            <div className='content-left'>
                <img src={img_two} alt="" className='dashboard-img' />
                <div>
                    <p>
                        Measure the success of your marketing
                        campaigns by create your own tracking
                        URL which helps you track the number
                        of visitors opened your link.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Landing;