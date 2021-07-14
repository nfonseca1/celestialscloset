import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Navbar from "../Navbar";
import Home from "./Home";
import Photo from "../Photo";
const Product = React.lazy(() => import(/* webpackChunkName: "product" */ "../Product"));
const Instagram = React.lazy(() => import(/* webpackChunkName: "instagram" */ "../Instagram"));
const Cart = React.lazy(() => import(/* webpackChunkName: "cart" */ "../Cart"));

export default class App extends React.Component<{}, { photo: JSX.Element }> {
    constructor(props: {}) {
        super(props);

        this.state = { photo: null }

        this.showFullPhoto = this.showFullPhoto.bind(this);
        this.hideFullPhoto = this.hideFullPhoto.bind(this);
    }

    showFullPhoto(link: string) {
        this.setState({
            photo: <Photo link={link} hideFullPhoto={this.hideFullPhoto} />
        })
    }

    hideFullPhoto() {
        this.setState({
            photo: null
        })
    }

    render() {
        return (
            <div className="App">
                <Helmet>
                    <meta name="description" content="Handmade, wire wrapped jewelry made with elegant crystals and unique charms."></meta>
                </Helmet>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Navbar context={'Home'} />
                            <Home />
                            <Helmet>
                                <title>Celestials Closet Jewelry</title>
                            </Helmet>
                        </Route>
                        <Route
                            path="/p/:id"
                            render={routeProps => (
                                <div>
                                    <Navbar context={'Home'} />
                                    <Home />
                                    <React.Suspense fallback={<div>Loading...</div>}>
                                        <Product {...routeProps} context={'Home'} showFullPhoto={this.showFullPhoto} />
                                    </React.Suspense>
                                </div>
                            )}
                        />
                        <Route path="/instagram">
                            <Navbar context={'Home'} />
                            <Home />
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <Instagram context={'Home'} />
                            </React.Suspense>
                        </Route>
                        <Route path="/cart">
                            <Navbar context={'Home'} />
                            <Home />
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <Cart />
                            </React.Suspense>
                        </Route>
                    </Switch>
                </Router>
                {this.state.photo}
                <div className="footer">&copy; 2021 Nathan Fonseca</div>
            </div>
        )
    }
}