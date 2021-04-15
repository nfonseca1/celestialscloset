import * as React from 'react';
import { Link } from 'react-router-dom';
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

        let pieces = this.props.data.photos[0].link.split("/photos");
        let imageString = `url(${pieces[0]}/photos/compressed${pieces[1]})`;

        this.state = {
            imageStyle: '',
            listingStyle: '',
            style: {
                backgroundImage: imageString,
                backgroundPosition: `${this.startImagePos.x}% ${this.startImagePos.y}%`
            }
        }
        this.activate = this.activate.bind(this);
        this.deactivate = this.deactivate.bind(this);
    }

    activate() {
        this.setState((state) => ({
            imageStyle: 'expandImage',
            listingStyle: 'expandListing'
        }))
    }

    deactivate() {

        this.setState((state) => ({
            imageStyle: 'shrinkImage',
            listingStyle: 'shrinkListing'
        }))
    }

    render() {

        return (
            <div className="Listing-Container">
                <div className={`Listing ${this.state.listingStyle}`}>
                    <div className="header">
                        <h2 className="title">
                            {this.props.data.title}
                        </h2>
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