import * as React from 'react';
import Navbar from "./Navbar";
import { IListing, getAllListings, getProductById } from "../lib/database";
import Listing from "./Listing";
import Product from "./Product";
import Photo from "./Photo";

interface State {
    listings: IListing[],
    product: JSX.Element,
    photo: JSX.Element
}

export default class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        let listingsData = getAllListings();
        this.state = {
            listings: listingsData || [],
            product: null,
            photo: null
        }

        this.renderProduct = this.renderProduct.bind(this);
        this.clearProduct = this.clearProduct.bind(this);
        this.showFullPhoto = this.showFullPhoto.bind(this);
        this.hideFullPhoto = this.hideFullPhoto.bind(this);
    }

    renderProduct(id: number) {
        let product = getProductById(id);

        this.setState({
            product: <Product data={product} clearProduct={this.clearProduct} showFullPhoto={this.showFullPhoto} />
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

    showFullPhoto(link: string) {
        this.setState({
            photo: <Photo link={link} hideFullPhoto={this.hideFullPhoto} />
        })
    }

    hideFullPhoto() {
        this.setState({
            photo: null
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
                {this.state.photo}
            </div>
        )
    }
}