import * as React from 'react';
import { Link } from 'react-router-dom';
import { match } from 'react-router';
import { History, Location } from 'history';
import Helmet from 'react-helmet';
import { IProduct, getProductById, getPaymentSettings, addToCart } from '../lib/database';
import cache from '../lib/cache';

interface Props {
    match: match<{ id: string }>,
    location: Location,
    history: History,
    context: string,
    showFullPhoto: (link: string) => void
}

interface State {
    photoIdx: number,
    data: IProduct,
    cartEnabled: boolean,
    addedToCart: boolean
}

export default class Product extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        let stripe = cache.getPayments().stripeEnabled;
        let paypal = cache.getPayments().paypalEnabled;

        if (stripe || paypal) {
            this.state = { data: null, photoIdx: 0, cartEnabled: true, addedToCart: false }
        }
        else if (stripe === null || paypal === null) {
            this.state = { data: null, photoIdx: 0, cartEnabled: false, addedToCart: false }

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
            this.state = { data: null, photoIdx: 0, cartEnabled: false, addedToCart: false }
        }

        const id = this.props.match.params.id;
        getProductById(id)
            .then(product => {
                let cdn = cache.getCDN();
                product.photos.map(p => {
                    let pieces = p.link.split("/photos");
                    let s3Path = `${pieces[0]}/photos`;
                    return `${cdn || s3Path}/compressed${pieces[1]}`;
                })
                this.setState({ data: product })
            })
            .catch(e => console.error(`Could not get product with id ${id} \n`, e))

        this.togglePhoto = this.togglePhoto.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    togglePhoto(dir: number = 1) {
        let nextPhotoIdx = this.state.photoIdx + dir;
        if (this.state.data?.photos[nextPhotoIdx]) {
            this.setState({
                photoIdx: nextPhotoIdx
            })
        }
        else if (nextPhotoIdx < 0) {
            this.setState({
                photoIdx: this.state.data?.photos.length - 1
            })
        }
        else {
            this.setState({
                photoIdx: 0
            })
        }
    }

    addToCart() {
        let data = this.state.data;
        addToCart(data.id, {
            thumbnailUrl: data.photos[0].link,
            title: data.title,
            price: data.price,
            quantity: 1
        })
        this.setState({
            addedToCart: true
        })
    }

    render() {
        document.body.style.overflowY = 'hidden';

        let stonesJSX = this.state.data?.details.stones?.map(s => {
            return <div className="list-item" key={s.stone}>{s.stone}</div>
        })

        let chakrasJSX = this.state.data?.details.chakras?.map(c => {
            return <div className="list-item" key={c}>{c}</div>
        })

        let benefitsJSX = this.state.data?.details.benefits?.map(b => {
            return <div className="list-item" key={b}>{b}</div>
        })

        let backJSX = (
            <Link to='/'>
                <div className="Product-Background"></div>
            </Link>
        )
        if (this.props.context == "Collection") {
            backJSX = (
                <Link to='/collection'>
                    <div className="Product-Background"></div>
                </Link>
            )
        }

        let arrowDisplay = this.state.data?.photos?.length > 1 ? { display: 'inline-block' } : { display: 'none' };

        let stones: JSX.Element | null = (
            <div className="detail">
                <div className="title">Stones</div>
                {stonesJSX}
            </div>
        )

        let chakras: JSX.Element | null = (
            <div className="detail">
                <div className="title">Chakras</div>
                {chakrasJSX}
            </div>
        )

        let benefits: JSX.Element | null = (
            <div className="detail">
                <div className="title">Benefits</div>
                {benefitsJSX}
            </div>
        )

        if (this.state.data?.options?.hideStones) stones = null;
        if (this.state.data?.options?.hideChakras) chakras = null;
        if (this.state.data?.options?.hideBenefits) benefits = null;

        let data = this.state.data;
        let alt = 'Handmade wire wrapped jewelry piece';
        let img: JSX.Element | null = null;

        if (data) {
            alt = `Handmade wire wrapped ${data.details?.stones?.[0]?.stone} jewelry piece`;
            if (data.details?.stones?.length > 1) {
                alt += ` with `;

                for (let i = 1; i < data.details.stones.length; i++) {
                    alt += i === 1 ? `${data.details.stones[i]?.stone}` : `, ${data.details.stones[i]?.stone}`;
                }
            }
            let styles: React.CSSProperties = {
                height: '100%',
                width: '100%',
                objectFit: 'contain'
            }
            let pieces = data?.photos[this.state.photoIdx]?.link.split("/photos");
            let s3Path = `${pieces[0]}/photos`;
            let cdn = cache.getCDN();
            img = <img src={`${cdn || s3Path}${pieces[1]}`} alt={alt} style={styles} />;
        }

        let title: JSX.Element | null = null;
        if (data?.title) title = <title>{`${data.title} | Celestials Closet`}</title>;

        let description: JSX.Element | null = null;
        if (data?.description) description = <meta name="description" content={data.description} />

        let preload: JSX.Element[] = [];
        let cdn = cache.getCDN();
        for (let img of data?.photos || []) {
            let pieces = img.link.split("/photos");
            let s3Path = `${pieces[0]}/photos`;
            preload.push(
                <link rel="preload" href={`${cdn || s3Path}${pieces[1]}`} as="image" />
            )
        }

        let priceInfo = <div className="price">${data?.price}</div>
        if (this.state.cartEnabled) {
            let cartBtn = <button className="button" onClick={this.addToCart}>Add to cart</button>
            if (this.state.addedToCart) {
                cartBtn = <button className="button clicked" onClick={this.addToCart} disabled>Added to cart</button>
            }
            priceInfo = (
                <div className="price-container">
                    <div className="price">${data?.price}</div>
                    {cartBtn}
                </div>
            )
        }

        return (
            <div className="Product-Container">
                <Helmet>
                    {title}
                    {description}
                    {preload}
                </Helmet>
                {backJSX}
                <div className="Product">
                    <div className="photo">
                        {img}
                        <div className="photo-collider" onClick={() => this.props.showFullPhoto(data?.photos[this.state.photoIdx].link)}></div>
                        <div className="arrow left" onClick={() => this.togglePhoto(-1)} style={arrowDisplay}></div>
                        <div className="arrow right" onClick={() => this.togglePhoto(1)} style={arrowDisplay}></div>
                    </div>
                    <div className="info">
                        <div className="product-header">
                            <div>{data?.title}</div>
                            {priceInfo}
                        </div>
                        <div className="description">
                            {data?.description}
                        </div>
                        <div className="details">
                            {stones}
                            {chakras}
                            {benefits}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}