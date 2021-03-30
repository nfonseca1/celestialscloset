import * as React from 'react';

export default class Navbar extends React.Component {
    render() {
        return (
            <div className="Navbar">
                <div className="logo-back"></div>
                <img src="/assets/logo.png" className="logo" />
                <div className="nav-container">
                    <div className="company-name">Celestials Closet</div>
                    <div className="nav-links">
                        <span>Collection</span>
                        <a href='https://www.instagram.com/celestials_closet/' target="_blank">Instagram</a>
                    </div>
                </div>
            </div>
        )
    }
}