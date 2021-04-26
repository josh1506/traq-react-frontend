import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import OtherRoute from './OtherRoute';
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
            <Switch>
                <Route path='/url/:shortUrl' component={props =>{
                    handleViewer(props)
                return null
                }} />
                <Route path='/' component={OtherRoute} />
            </Switch>
        </div>
    );
}

export default connect(null, { getCurrentUser })(App);