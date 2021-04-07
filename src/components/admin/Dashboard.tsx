import * as React from 'react';
import { Link } from 'react-router-dom';
import cache from '../../lib/cache';
import { getAllListings, IListing } from '../../lib/database';
import AdminListing from './AdminListing';

interface State {
    listings: IListing[]
    showingActive: boolean
}

export default class Dashboard extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        cache.setPaginationKey(null);
        this.state = { listings: [], showingActive: true }

        if (!cache.isPolling()) {
            getAllListings(true)
                .then(listingsData => {
                    this.setState({
                        listings: listingsData || [],
                        showingActive: true
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
        this.switchActive = this.switchActive.bind(this);
    }

    setupObserver() {
        let observer = new IntersectionObserver(this.analyzeScroll, { rootMargin: '25%' });
        observer.observe(document.querySelector(".footer"));
    }

    analyzeScroll(entries: IntersectionObserverEntry[]) {
        if (Date.now() < cache.getPollBuffer() || cache.isPolling()) return;
        getAllListings(true, 15, this.state.showingActive)
            .then(listingsData => {
                this.setState((state) => ({
                    listings: listingsData ? [...state.listings, ...listingsData] : state.listings
                }), () => {
                    cache.setPollBuffer(1000);
                })
            })
            .catch(e => console.error(`Could not get additional listings in collection \n`, e));
    }

    switchActive() {
        cache.setPaginationKey(null);
        getAllListings(true, 15, this.state.showingActive)
            .then(listingsData => {
                this.setState((state) => ({
                    listings: listingsData || [],
                    showingActive: !state.showingActive
                }), () => {
                    cache.setPollBuffer(1000);
                })
                cache.setCache(listingsData);
            })
            .catch(e => console.error(`Could not get all listings in collection \n`, e));
    }

    render() {
        setTimeout(() => this.setupObserver(), 200);

        let listingsJSX = this.state.listings.map(l => {
            return <AdminListing id={l.id} photo={l.photos[0]?.link} title={l.title} price={l.price} key={l.id} />
        })

        let listingsLabel: string = 'Active Listings';
        let activeSwitchText: string = 'Show Inactive';
        if (this.state.showingActive === false) {
            let listingsLabel: string = 'Inactive Listings';
            activeSwitchText = 'Show Active'
        }

        return (
            <div className="Dashboard">
                <h1>Dashboard</h1>
                <h2>Listings</h2>
                <div className="options">
                    <Link to="/admin/listings/new">
                        <button className="new-listing-btn">New Listing</button>
                    </Link>
                    <span onClick={this.switchActive}>{activeSwitchText}</span>
                </div>
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