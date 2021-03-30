import * as React from 'react';
import { IProduct } from '../lib/database'

interface Props {
    data: IProduct,
    clearProduct: () => void
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

        return (
            <div className="Product-Container">
                <div className="Product-Background" onClick={this.props.clearProduct}></div>
                <div className="Product">
                    <div className="photo" style={style}>
                        <div className="arrow left" onClick={() => this.togglePhoto(-1)}></div>
                        <div className="arrow right" onClick={() => this.togglePhoto(1)}></div>
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
                                <div className="list-item">Aqua Aura Quartz</div>
                            </div>
                            <div className="detail">
                                <div className="title">Chakras</div>
                                <div className="list-item">Crown</div>
                                <div className="list-item">Throat</div>
                            </div>
                            <div className="detail">
                                <div className="title">Benefits</div>
                                <div className="list-item">Anxiety Relief</div>
                                <div className="list-item">Honesty</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}