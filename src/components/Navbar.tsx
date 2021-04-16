import * as React from 'react';
import { Link } from 'react-router-dom';
import Context from '../lib/Context';

export default class Navbar extends React.Component<{ context: Context }> {
    render() {
        let homeNavJSX = (
            <Link to='/'>
                <div className="company-name">Celestials Closet</div>
            </Link>
        )
        let collectionNavJSX = (
            <a href='/collection'>
                <span>Collection</span>
            </a>
        )
        if (this.props.context == "Collection") {
            homeNavJSX = (
                <a href='/'>
                    <div className="company-name">Celestials Closet</div>
                </a>
            )
            collectionNavJSX = (
                <Link to='/collection'>
                    <span>Collection</span>
                </Link>
            )
        }

        return (
            <div className="Navbar">
                <div className="logo-back"></div>
                <img src="/assets/logo.png" className="logo" alt="Celestials Closet Logo" />
                <div className="nav-container">
                    {homeNavJSX}
                    <div className="nav-links">
                        {collectionNavJSX}
                        <Link to="/instagram">
                            <span>Instagram</span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}