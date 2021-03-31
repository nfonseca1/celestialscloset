import * as React from 'react';
import { Link } from 'react-router-dom';
import { match } from 'react-router';
import { History, Location } from 'history';
import { IProduct, getProductById } from '../lib/database';
import Photo from './Photo';
import Context from '../lib/Context';

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
    photo: JSX.Element
}

export default class Product extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        let product = getProductById(parseInt(this.props.match.params.id));
        this.state = { photoIdx: 0, data: product, photo: null }

        this.togglePhoto = this.togglePhoto.bind(this);
    }

    togglePhoto(dir: number = 1) {
        let nextPhotoIdx = this.state.photoIdx + dir;
        if (this.state.data.photos[nextPhotoIdx]) {
            this.setState({
                photoIdx: nextPhotoIdx
            })
        }
        else if (nextPhotoIdx < 0) {
            this.setState({
                photoIdx: this.state.data.photos.length - 1
            })
        }
        else {
            this.setState({
                photoIdx: 0
            })
        }
    }

    render() {
        document.body.style.overflowY = 'hidden';

        let style = {
            backgroundImage: `url(${this.state.data.photos[this.state.photoIdx]?.link})`
        }

        let stonesJSX = this.state.data.stones?.map(s => {
            return <div className="list-item" key={s}>{s}</div>
        })

        let chakrasJSX = this.state.data.chakras?.map(c => {
            return <div className="list-item" key={c}>{c}</div>
        })

        let benefitsJSX = this.state.data.benefits?.map(b => {
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

        let arrowDisplay = this.state.data.photos?.length > 1 ? { display: 'inline-block' } : { display: 'none' }

        return (
            <div className="Product-Container">
                {backJSX}
                <div className="Product">
                    <div className="photo" style={style}>
                        <div className="photo-collider" onClick={() => this.props.showFullPhoto(this.state.data.photos[this.state.photoIdx].link)}></div>
                        <div className="arrow left" onClick={() => this.togglePhoto(-1)} style={arrowDisplay}></div>
                        <div className="arrow right" onClick={() => this.togglePhoto(1)} style={arrowDisplay}></div>
                    </div>
                    <div className="info">
                        <div className="product-header">
                            <div>{this.state.data.title}</div>
                            <div>${this.state.data.price}</div>
                        </div>
                        <div className="description">
                            {this.state.data.description}
                        </div>
                        <div className="details">
                            <div className="detail">
                                <div className="title">Stones</div>
                                {stonesJSX}
                            </div>
                            <div className="detail">
                                <div className="title">Chakras</div>
                                {chakrasJSX}
                            </div>
                            <div className="detail">
                                <div className="title">Benefits</div>
                                {benefitsJSX}
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.photo}
            </div>
        )
    }
}