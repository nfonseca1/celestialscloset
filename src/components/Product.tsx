import * as React from 'react';
import { IProduct } from '../lib/database'

interface Props {
    data: IProduct,
    clearProduct: () => void,
    showFullPhoto: (link: string) => void;
}

interface State {
    photoIdx: number
}

export default class Product extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { photoIdx: 0 }

        this.togglePhoto = this.togglePhoto.bind(this);
    }

    togglePhoto(dir: number = 1) {
        let nextPhotoIdx = this.state.photoIdx + dir;
        if (this.props.data.photos[nextPhotoIdx]) {
            this.setState({
                photoIdx: nextPhotoIdx
            })
        }
        else if (nextPhotoIdx < 0) {
            this.setState({
                photoIdx: this.props.data.photos.length - 1
            })
        }
        else {
            this.setState({
                photoIdx: 0
            })
        }
    }

    render() {
        let style = {
            backgroundImage: `url(${this.props.data.photos[this.state.photoIdx]?.link})`
        }

        let stonesJSX = this.props.data.stones?.map(s => {
            return <div className="list-item" key={s}>{s}</div>
        })

        let chakrasJSX = this.props.data.chakras?.map(c => {
            return <div className="list-item" key={c}>{c}</div>
        })

        let benefitsJSX = this.props.data.benefits?.map(b => {
            return <div className="list-item" key={b}>{b}</div>
        })

        let arrowDisplay = this.props.data.photos?.length > 1 ? { display: 'inline-block' } : { display: 'none' }

        return (
            <div className="Product-Container">
                <div className="Product-Background" onClick={this.props.clearProduct}></div>
                <div className="Product">
                    <div className="photo" style={style}>
                        <div className="photo-collider" onClick={() => this.props.showFullPhoto(this.props.data.photos[this.state.photoIdx].link)}></div>
                        <div className="arrow left" onClick={() => this.togglePhoto(-1)} style={arrowDisplay}></div>
                        <div className="arrow right" onClick={() => this.togglePhoto(1)} style={arrowDisplay}></div>
                    </div>
                    <div className="info">
                        <div className="product-header">
                            <div>{this.props.data.title}</div>
                            <div>${this.props.data.price}</div>
                        </div>
                        <div className="description">
                            {this.props.data.description}
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
            </div>
        )
    }
}