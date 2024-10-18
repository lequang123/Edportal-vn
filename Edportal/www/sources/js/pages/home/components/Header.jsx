import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Create from './Create';
import Edit from './Edit';

export default function Header() {  
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/create'} className="nav-link">Create</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/edit'} className="nav-link">Edit</Link>
                                </li>
                            </ul>
                        </div>
                    </nav> <br/>
                    <Switch>
                        <Route exact path='/create' component={ Create } />
                        <Route path='/edit' component={ Edit } />
                    </Switch>
                </div>
            </Router>
        );
}
