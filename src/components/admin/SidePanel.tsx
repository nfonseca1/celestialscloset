import * as React from 'react';
import { Link } from "react-router-dom";

export default class SidePanel extends React.Component {
    render() {
        return (
            <div className="SidePanel">
                <h2 className="header">Admin Panel</h2>
                <Link to="/admin/home"><div className="option">Listings</div></Link>
                <Link to="/admin/payments"><div className="option">Payments</div></Link>
            </div>
        )
    }
}