import * as React from 'react';
import { Link } from 'react-router-dom';
import Listing from '../Listing';
import { getAllListings, IListing } from '../../lib/database';

interface State {
    listings: IListing[]
}

export default class Home extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        let listingsData = getAllListings(6);
        this.state = {
            listings: listingsData || []
        }
    }
    render() {
        document.body.style.overflowY = 'scroll';

        let listingsJSX: JSX.Element[] = [];
        listingsJSX = this.state.listings.map(l => {
            return <Listing data={l} key={l.id} />
        })

        return (
            <div>
                <div className="background-header">
                    <div></div>
                </div>
                <div className="listings-section">
                    <h3>Recent Releases 💎</h3>
                    <div className="listings">
                        {listingsJSX}
                    </div>
                    <div className="more-link-container">
                        <a href="/collection">
                            <div className="more-link">View All In Collection</div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}