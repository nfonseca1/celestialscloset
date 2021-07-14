import * as React from 'react';
import cache from '../lib/cache';

interface State {
    cart: any
}

export default class Cart extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = { cart: cache.getCart() }
    }
    render() {
        let items: JSX.Element[] = [];
        let cart = this.state.cart
        for (let item of Object.keys(cart)) {
            let itemJSX = (
                <div className="cart-item">
                    <img src={cart[item].thumbnailUrl} alt={cart[item].title} />
                    <h2>{cart[item].title}</h2>
                    <span>{cart[item].quantity}</span>
                    <span>{cart[item].price}</span>
                </div>
            )
            items.push(itemJSX);
        }

        return (
            <div className="Cart-Container">
                <div className="Cart-Background"></div>
                <div className="Cart">
                    {items}
                </div>
            </div>
        )
    }
}