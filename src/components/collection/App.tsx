import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "../Navbar";
import Product from "../Product";
import Collection from "./Collection";
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
                        <Route path="/collection">
                            <Navbar context={'Collection'} />
                            <Collection />
                        </Route>
                        <Route
                            path="/p/:id"
                            render={routeProps => (
                                <div>
                                    <Navbar context={'Collection'} />
                                    <Collection />
                                    <Product {...routeProps} context={'Collection'} />
                                </div>
                            )}
                        />
                        <Route path="/instagram">
                            <Navbar context={'Collection'} />
                            <Collection />
                            <Instagram context={'Collection'} />
                        </Route>
                    </Switch>
                </Router>
                <div className="footer">&copy; 2021 Nathan Fonseca</div>
            </div>
        )
    }
}