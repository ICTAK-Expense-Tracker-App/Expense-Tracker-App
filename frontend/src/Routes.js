import React from 'react';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Home from './components/Home';
import AddNew from './components/AddNew';
import Profile from './components/Profile';
import Admin from './components/Admin';

const Routes = () =>{
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/AddNew" component={AddNew} />
                <Route path="/Profile" component={Profile} />
                <Route path="/Admin" component={Admin} />
            </Switch>
        </Router>
    );
}

export default Routes;