import React from 'react';

import img_one from '../assets/img/11000.jpg'
import img_two from '../assets/img/9812.jpg'
import '../assets/css/pages/landing.css'

function Landing(props) {
    return (
        <div>
            <div>
                <img src={img_one} alt="" height='200' />
                <div>
                    <div>
                        <h1>Traq</h1>
                        <p>
                            Manage and keep track your url's
                            now by signing up for Free
                        </p>
                    </div>
                    <button>Login / Signup for Free</button>
                </div>
            </div>
            <div>
                <img src={img_two} alt="" height='200' />
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