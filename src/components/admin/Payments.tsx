import * as React from 'react';

export default class Payments extends React.Component {
    render() {
        return (
            <div className="Payments">
                <h1>Payment Methods</h1>

                <div className="payment-options">
                    <div className="stripe">
                        <h2>Stripe</h2>
                        <div className="description">Accept credit and debit card payments using Stripe. To enable this option, you must first provide your Stripe API keys below. For info, <span className="link">click here.</span></div>

                        <div className="options">
                            <div className="keys">
                                <div className="api-key">
                                    <label htmlFor="publishable-key">Publishable Key</label>
                                    <input className="key-input" id="publishable-key" type="text" />
                                </div>
                                <div className="api-key">
                                    <label htmlFor="secret-key">Secret Key</label>
                                    <input className="key-input" id="secret-key" type="password" />
                                </div>
                            </div>
                            <button className="verify-btn">Verify Keys</button>
                            <div className="setting">
                                <div className="left">
                                    <div className="heading">Use Stripe Climate</div>
                                    <div className="description">When checked, a fraction of each sale made through Stripe will go towards carbon removal technologies. <a className="link" target="_blank" href="https://stripe.com/climate">Click here</a> to learn more.</div>
                                </div>
                                <div className="checkbox">
                                    <input id="enable-climate" type="checkbox" />
                                </div>
                            </div>
                            <div className="setting">
                                <div className="left">
                                    <div className="heading">Enable Stripe</div>
                                    <div className="description">If the above keys have been verified, this will officially enable Stripe for credit and debit card payments.</div>
                                </div>
                                <div className="checkbox">
                                    <input id="enable-climate" type="checkbox" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="paypal">
                        <h2>Paypal</h2>
                        <div className="description">Accept payments through Paypal accounts. To enable this option, you must first provide your Paypal API keys below. For info, <span className="link">click here.</span></div>

                        <div className="options">
                            <div className="keys">
                                <div className="api-key">
                                    <label htmlFor="publishable-key">Publishable Key</label>
                                    <input className="key-input" id="publishable-key" type="text" />
                                </div>
                                <div className="api-key">
                                    <label htmlFor="secret-key">Secret Key</label>
                                    <input className="key-input" id="secret-key" type="password" />
                                </div>
                            </div>
                            <button className="verify-btn">Verify Keys</button>
                            <div className="setting">
                                <div className="left">
                                    <div className="heading">Enable Paypal</div>
                                    <div className="description">If the above keys have been verified, this will officially enable Paypal payments.</div>
                                </div>
                                <div className="checkbox">
                                    <input id="enable-climate" type="checkbox" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}