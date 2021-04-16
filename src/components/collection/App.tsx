import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Navbar from "../Navbar";
import Collection from "./Collection";
import Photo from "../Photo";
const Product = React.lazy(() => import(/* webpackChunkName: "product" */ "../Product"));
const Instagram = React.lazy(() => import(/* webpackChunkName: "instagram" */ "../Instagram"));

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
                        <Route path="/collection">
                            <Navbar context={'Collection'} />
                            <Collection />
                            <Helmet>
                                <title>Jewelry Collection | Celestials Closet</title>
                            </Helmet>
                        </Route>
                        <Route
                            path="/p/:id"
                            render={routeProps => (
                                <div>
                                    <Navbar context={'Collection'} />
                                    <Collection />
                                    <React.Suspense fallback={<div>Loading...</div>}>
                                        <Product {...routeProps} context={'Collection'} showFullPhoto={this.showFullPhoto} />
                                    </React.Suspense>
                                </div>
                            )}
                        />
                        <Route path="/instagram">
                            <Navbar context={'Collection'} />
                            <Collection />
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <Instagram context={'Collection'} />
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