import * as React from 'react';
import { Link } from 'react-router-dom';
import Context from '../lib/Context';
import cache from '../lib/cache';
import { getPaymentSettings } from '../lib/database';

interface Props {
    context: Context
}

interface State {
    cartEnabled: boolean
}

export default class Navbar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        let stripe = cache.getPayments().stripeEnabled;
        let paypal = cache.getPayments().paypalEnabled;

        if (stripe || paypal) {
            this.state = { cartEnabled: true }
        }
        else if (stripe === null || paypal === null) {
            this.state = { cartEnabled: false }

            getPaymentSettings()
                .then(settings => {
                    let cartEnabled = false;
                    if (settings.stripeEnabled || settings.paypalEnabled) cartEnabled = true;
                    this.setState({
                        cartEnabled: cartEnabled
                    })
                })
        }
        else {
            this.state = { cartEnabled: false }
        }
    }
    render() {
        let homeNavJSX = (
            <Link to='/'>
                <div className="company-name">Celestials Closet</div>
            </Link>
        )
        let collectionNavJSX = (
            <a href='/collection'>
                <span>Collection</span>
            </a>
        )
        if (this.props.context == "Collection") {
            homeNavJSX = (
                <a href='/'>
                    <div className="company-name">Celestials Closet</div>
                </a>
            )
            collectionNavJSX = (
                <Link to='/collection'>
                    <span>Collection</span>
                </Link>
            )
        }

        let cartNavJSX: JSX.Element = null;
        if (this.state.cartEnabled) {
            cartNavJSX = <Link to="/cart">Cart</Link>
        }

        return (
            <div className="Navbar">
                <div className="logo-back"></div>
                <img src="/assets/logo.png" className="logo" alt="Celestials Closet Logo" />
                <div className="nav-container">
                    {homeNavJSX}
                    <div className="nav-links">
                        {collectionNavJSX}
                        <Link to="/instagram">
                            <span>Instagram</span>
                        </Link>
                        {cartNavJSX}
                    </div>
                </div>
            </div>
        )
    }
}