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
                </div>
            </div>
        )
    }
}