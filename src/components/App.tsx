import * as React from 'react';
import Navbar from "./Navbar";
import { IListing, getAllListings } from "../lib/database";
import Listing from "./Listing";

export default class App extends React.Component<{}, { listings: IListing[] }> {
    constructor() {
        super({});

        let listingsData = getAllListings();
        this.state = { listings: listingsData || [] }
    }

    render() {
        let listingsJSX: JSX.Element[] = [];

        listingsJSX = this.state.listings.map(l => {
            return <Listing data={l} />
        })

        return (
            <div className="App">
                <Navbar />
                <div className="background-header">
                    <div></div>
                </div>
                <div className="listings-section">
                    <h3>Recent Releases 💎</h3>
                    <div className="listings">
                        {listingsJSX}
                    </div>
                </div>
            </div>
        )
    }
}