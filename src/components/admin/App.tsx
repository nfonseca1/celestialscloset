import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import Payments from "./Payments";
import SidePanel from "./SidePanel";
import PutListing from "./PutListing";

export default class App extends React.Component {
    render() {
        return (
            <div className="Admin">
                <Router>
                    <Switch>
                        <Route path="/admin/home">
                            <SidePanel />
                            <Dashboard />
                        </Route>
                        <Route path="/admin/payments">
                            <SidePanel />
                            <Payments />
                        </Route>
                        <Route
                            exact path="/admin/listings/new"
                            render={routeProps => (
                                <PutListing {...routeProps} />
                            )}
                        />
                        <Route
                            path="/admin/listings/new/:id"
                            render={routeProps => (
                                <PutListing {...routeProps} />
                            )}
                        />
                    </Switch>
                </Router>
                <div className="footer">&copy; 2021 Nathan Fonseca</div>
            </div>
        )
    }
}