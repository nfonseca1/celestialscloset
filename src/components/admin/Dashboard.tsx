import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="Dashboard">
                <Link to="/admin/listings/new">
                    <button className="new-listing-btn">New Listing</button>
                </Link>
            </div>
        )
    }
}