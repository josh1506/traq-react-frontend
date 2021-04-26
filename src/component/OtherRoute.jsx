import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import Footer from './common/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Nav from './common/Nav';
import NotFound from './pages/NotFound';

const OtherRoute = () => {
    return (
        <div>
            <Nav />
            <main className='main-container'>
            <Route
                render={({ location }) => (
                    <AnimatePresence exitBeforeEnter>
                        <Switch location={location} key={location.key}>
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
    )
}

export default OtherRoute
