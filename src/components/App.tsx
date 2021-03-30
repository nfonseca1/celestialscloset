import * as React from 'react';
import Navbar from "./Navbar";
import { IListing, getAllListings, getProductById } from "../lib/database";
import Listing from "./Listing";
import Product from "./Product";

export default class App extends React.Component<{}, { listings: IListing[], product: JSX.Element }> {
    constructor(props: {}) {
        super(props);

        let listingsData = getAllListings();
        this.state = {
            listings: listingsData || [],
            product: null
        }

        this.renderProduct = this.renderProduct.bind(this);
        this.clearProduct = this.clearProduct.bind(this);
    }

    renderProduct(id: number) {
        let product = getProductById(id);

        this.setState({
            product: <Product data={product} clearProduct={this.clearProduct} />
        }, () => {
            document.body.style.overflow = 'hidden';
        })
    }

    clearProduct() {
        this.setState({
            product: null
        }, () => {
            document.body.style.overflowY = 'scroll';
        })
    }

    render() {
        let listingsJSX: JSX.Element[] = [];

        listingsJSX = this.state.listings.map(l => {
            return <Listing data={l} renderProduct={this.renderProduct} key={l.id} />
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
                {this.state.product}
            </div>
        )
    }
}