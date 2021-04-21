import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { connect } from 'react-redux'

import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import Footer from './common/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Nav from './common/Nav';
import NotFound from './pages/NotFound';
import route from './route/traq'
import { getCurrentUser } from './app/auth'
import './assets/css/app.css'

function App(props) {
    useEffect(() => {
        props.getCurrentUser()
    }, [])

    const handleViewer = async({match, history}) => {
        await route.get(`url_tracker/view/${match.params.shortUrl}`)
        .then(({data}) => window.location.replace(data.data))
        .catch(() => history.push('/not-found'))
    }

    return (
        <div>
            <Nav />
            <main className='main-container'>

                <Route
                    render={({ location }) => (
                        <AnimatePresence exitBeforeEnter>
                            <Switch location={location} key={location.key}>
                                <Route path='/url/:shortUrl' component={props =>{
                                    handleViewer(props)
                                return null
                                }} />
                                <Route path='/login' component={Login} />
                                <Route path='/dashboard/:id' component={Details} />
                                <Route path='/dashboard' component={Dashboard} />
                                <Route path='/not-found' component={NotFound} />
                                <Route path='/' exact component={Landing} />
                                <Redirect to='/not-found' />
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