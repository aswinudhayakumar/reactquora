import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import Home from '../components/Home/Home';

class Approuter extends PureComponent {
    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        )
    }
}

export default Approuter
