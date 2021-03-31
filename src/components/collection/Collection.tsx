import * as React from 'react';
import Listing from '../Listing';
import { getAllListings, IListing } from '../../lib/database';

interface State {
    listings: IListing[]
}

export default class Collection extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        let listingsData = getAllListings();
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
            <div className="Collection">
                <div className="listings-section">
                    <h3>Crystal Collection 💎</h3>
                    <div className="listings">
                        {listingsJSX}
                    </div>
                </div>
            </div>
        )
    }
}