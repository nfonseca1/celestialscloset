import { readlink } from 'fs/promises';
import { url } from 'node:inspector';
import * as React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
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
    startImage: string = `url(${this.props.data.photos[0].link})`;
    startImagePos = {
        x: this.props.data.photos[0]?.crop?.x || 0,
        y: this.props.data.photos[0]?.crop?.y || 0
    }

    //imageFlipInterval: NodeJS.Timeout = null;
    //currentImageIdx = 0;

    constructor(props: Props) {
        super(props)

        this.state = {
            imageStyle: '',
            listingStyle: '',
            style: {
                backgroundImage: this.startImage,
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
        }), () => {
            //this.imageFlipInterval = setInterval(() => {
            //    if (this.props.data.photos[this.currentImageIdx + 1]) {
            //        this.currentImageIdx++;
            //    }
            //    else {
            //        this.currentImageIdx = 0;
            //    }

            //    this.setState((state, props) => ({
            //        style: {
            //            backgroundImage: `url(${props.data.photos[this.currentImageIdx].link})`,
            //            backgroundPosition: state.style.backgroundPosition
            //        }
            //    }))
            //}, 750)
        })
    }

    deactivate() {
        //clearInterval(this.imageFlipInterval);
        //this.currentImageIdx = 0;

        this.setState((state) => ({
            imageStyle: 'shrinkImage',
            listingStyle: 'shrinkListing',
            style: {
                backgroundImage: this.startImage,
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
                <Link to={`/p/${this.props.data.id}`}>
                    <div className="Listing-Collider" onMouseEnter={this.activate} onMouseLeave={this.deactivate}></div>
                </Link>
            </div >
        )
    }
}