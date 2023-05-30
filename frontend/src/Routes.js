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
                <Route exact path="/" components={Home} />
                <Route path="/add" component={AddNew} />
                <Route path="/profile" component={Profile} />
                <Route path="/admin" component={Admin} />
            </Switch>
        </Router>
    );
}

export default Routes;