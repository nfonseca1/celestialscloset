import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "../Navbar";
import Home from "./Home";
import Product from "../Product";
import Instagram from "../Instagram";

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
                            <Navbar context={'Home'} />
                            <Home />
                        </Route>
                        <Route
                            path="/p/:id"
                            render={routeProps => (
                                <div>
                                    <Navbar context={'Home'} />
                                    <Home />
                                    <Product {...routeProps} context={'Home'} />
                                </div>
                            )}
                        />
                        <Route path="/instagram">
                            <Navbar context={'Collection'} />
                            <Home />
                            <Instagram context={'Home'} />
                        </Route>
                    </Switch>
                </Router>
                <div className="footer">&copy; 2021 Nathan Fonseca</div>
            </div>
        )
    }
}