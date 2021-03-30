import { readlink } from 'fs/promises';
import { url } from 'node:inspector';
import * as React from 'react';
import { IListing } from '../lib/database'

interface Props {
    data: IListing
}

interface State {
    imageStyle: string,
    listingStyle: string,
    style: {
        backgroundImage: string,
        backgroundPosition: string,
        transition?: string
    }
}

export default class Listing extends React.Component<Props, State>  {
    startImagePos = {
        x: this.props.data.photos[0]?.crop?.x || 0,
        y: this.props.data.photos[0]?.crop?.y || 0
    }

    constructor(props: Props) {
        super(props)

        this.state = {
            imageStyle: '',
            listingStyle: '',
            style: {
                backgroundImage: `url(${this.props.data.photos[0].link})`,
                backgroundPosition: `${this.startImagePos.x}% ${this.startImagePos.y}%`
            }
        }
        this.activate = this.activate.bind(this);
        this.deactivate = this.deactivate.bind(this);
    }

    activate() {
        this.setState((state) => ({
            imageStyle: 'expandImage',
            listingStyle: 'expandListing',
            style: {
                backgroundImage: state.style.backgroundImage,
                backgroundPosition: state.style.backgroundPosition
            }
        }))
    }

    deactivate() {
        this.setState((state) => ({
            imageStyle: 'shrinkImage',
            listingStyle: 'shrinkListing',
            style: {
                backgroundImage: state.style.backgroundImage,
                backgroundPosition: state.style.backgroundPosition
            }
        }))
    }

    render() {

        return (
            <div className="Listing-Container">
                <div className={`Listing ${this.state.listingStyle}`}>
                    <div className="header">
                        <div className="title">
                            {this.props.data.title}
                        </div>
                        <div className="price">
                            ${this.props.data.price}
                        </div>
                    </div>
                    <div className={`thumbnail ${this.state.imageStyle}`} style={this.state.style}></div>
                </div >
                <div className="Listing-Collider" onMouseEnter={this.activate} onMouseLeave={this.deactivate}></div>
            </div >
        )
    }
}