import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { connect } from 'react-redux'

import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Nav from './common/Nav';
import Footer from './common/Footer';
import Viewer from './pages/Viewer';
import { getCurrentUser } from './app/auth'
import './assets/css/app.css'

function App(props) {
    useEffect(() => {
        props.getCurrentUser()
    }, [])

    return (
        <div>
            <Nav />
            <main className='main-container'>

                <Route
                    render={({ location }) => (
                        <AnimatePresence exitBeforeEnter>
                            <Switch location={location} key={location.key}>
                                <Route path='/url/:shortUrl' component={Viewer} />
                                <Route path='/login' component={Login} />
                                <Route path='/dashboard/:id' component={Details} />
                                <Route path='/dashboard' component={Dashboard} />
                                <Route path='/' component={Landing} />
                            </Switch>
                        </AnimatePresence>
                    )}
                />
            </main>
            <Footer />
        </div>
    );
}

export default connect(null, { getCurrentUser })(App);