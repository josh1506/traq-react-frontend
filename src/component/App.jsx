import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Nav from './common/Nav';
import './assets/css/app.css'
import Footer from './common/Footer';

function App(props) {
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

export default App;