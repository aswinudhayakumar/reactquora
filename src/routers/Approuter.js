import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import Home from '../components/Home/Home';
import Signup from '../components/Signup/Signup';
import Signin from '../components/Signin/Signin';
import Answer from '../components/Answer/Answer';
import Quill from '../components/Questions/quil';
import Singlequestion from '../components/Singlequestion/Singlequestion';
import Profile from '../components/Profile/Profile';

class Approuter extends PureComponent {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Signup} />
                    <Route exact path="/signin" component={Signin} />
                    <Route exact path="/feed" component={Home} />
                    <Route exact path="/answer" component={Answer} />
                    <Route exact path="/quil" component={Quill} />
                    <Route exact path="/question" component={Singlequestion} />
                    <Route exact path="/profile" component={Profile} />
                </Switch>
            </Router>
        )
    }
}

export default Approuter
