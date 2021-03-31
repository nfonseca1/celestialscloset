import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./Navbar";
import Home from "./Home";
import Product from "./Product";

export default class App extends React.Component<{}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Navbar />
                            <Home />
                        </Route>
                        <Route
                            path="/p/:id"
                            render={routeProps => (
                                <div>
                                    <Navbar />
                                    <Home />
                                    <Product match={routeProps.match} />
                                </div>
                            )}
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}