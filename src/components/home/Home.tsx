import * as React from 'react';
import Listing from '../Listing';
import { getAllListings, IListing } from '../../lib/database';
import cache from '../../lib/cache';

interface State {
    listings: IListing[]
}

export default class Home extends React.Component<{}, State> {
    limit = 6;

    constructor(props: {}) {
        super(props);

        this.state = { listings: cache.getCache() }

        if ((cache.getCache()?.length > 0) == false) {
            getAllListings(true, this.limit)
                .then(listingsData => {
                    this.setState({
                        listings: listingsData || []
                    }, () => {
                        cache.setPollBuffer(1000);
                    })
                    cache.setCache(listingsData);
                })
                .catch(e => console.error(`Could not get all listings in collection \n`, e));
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