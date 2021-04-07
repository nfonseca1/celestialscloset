import * as React from 'react';
import { Link } from 'react-router-dom';
import cache from '../../lib/cache';
import { getAllListings, IListing } from '../../lib/database';
import AdminListing from './AdminListing';

interface State {
    listings: IListing[]
}

export default class Dashboard extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        cache.setPaginationKey(null);
        this.state = { listings: [] }

        if (!cache.isPolling()) {
            getAllListings(true)
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
        let observer = new IntersectionObserver(this.analyzeScroll, { rootMargin: '25%' });
        observer.observe(document.querySelector(".footer"));
    }

    analyzeScroll(entries: IntersectionObserverEntry[]) {
        if (Date.now() < cache.getPollBuffer() || cache.isPolling()) return;
        getAllListings(true)
            .then(listingsData => {
                console.log(entries);
                this.setState((state) => ({
                    listings: listingsData ? [...state.listings, ...listingsData] : state.listings
                }), () => {
                    cache.setPollBuffer(1000);
                })
            })
            .catch(e => console.error(`Could not get additional listings in collection \n`, e));
    }

    render() {
        setTimeout(() => this.setupObserver(), 200);

        let listingsJSX = this.state.listings.map(l => {
            return <AdminListing id={l.id} photo={l.photos[0].link} title={l.title} price={l.price} key={l.id} />
        })

        return (
            <div className="Dashboard">
                <h1>Dashboard</h1>
                <h2>Listings</h2>
                <Link to="/admin/listings/new">
                    <button className="new-listing-btn">New Listing</button>
                </Link>
                <div className="listings-header">
                    <div className="image-container"></div>
                    <div className="title">Title</div>
                    <div className="price">Price</div>
                    <div className="toolbar"><div>Options</div></div>
                </div>
                <div className="admin-listings">
                    {listingsJSX}
                </div>
            </div>
        )
    }
}