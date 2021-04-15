import * as React from 'react';
import Listing from '../Listing';
import { getAllListings, IListing } from '../../lib/database';
import cache from '../../lib/cache';

interface State {
    listings: IListing[]
}

export default class Collection extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = { listings: cache.getCache() }

        if ((cache.getCache()?.length > 0) == false && !cache.isPolling()) {
            getAllListings(false)
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
        else {
            cache.setPollBuffer(2000);
        }

        this.setupObserver = this.setupObserver.bind(this);
        this.analyzeScroll = this.analyzeScroll.bind(this);
    }

    setupObserver() {
        let observer = new IntersectionObserver(this.analyzeScroll, { rootMargin: '40%' });
        observer.observe(document.querySelector(".footer"));
    }

    analyzeScroll(entries: IntersectionObserverEntry[]) {
        if (Date.now() < cache.getPollBuffer() || cache.isPolling()) return;
        getAllListings(true)
            .then(listingsData => {
                this.setState((state) => ({
                    listings: listingsData ? [...state.listings, ...listingsData] : state.listings
                }), () => {
                    cache.setPollBuffer(1000);
                })
                cache.addToCache(listingsData);
            })
            .catch(e => console.error(`Could not get additional listings in collection \n`, e));
    }

    render() {
        setTimeout(() => this.setupObserver(), 200);
        document.body.style.overflowY = 'scroll';

        let listingsJSX: JSX.Element[] = [];
        listingsJSX = this.state.listings.map(l => {
            return <Listing data={l} key={l.id} />
        })

        return (
            <div className="Collection">
                <div className="listings-section">
                    <h1>Crystal Collection 💎</h1>
                    <div className="listings">
                        {listingsJSX}
                    </div>
                </div>
            </div>
        )
    }
}