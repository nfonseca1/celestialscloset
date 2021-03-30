import * as React from 'react';
import { IListing } from '../lib/database'

export default class HoverListing extends React.Component<{ data: IListing, ref: React.RefObject<unknown> }>  {
    render() {
        const thumbnailStyle = {
            backgroundImage: `url(${this.props.data.photos[0].link})`,
            backgroundPosition: `${this.props.data.photos[0]?.crop?.x || 0}% ${this.props.data.photos[0]?.crop?.y || 0}%`
        }

        return (
            <div className="HoverListing expandAnim">
                <div className="header">
                    <div className="title">
                        {this.props.data.title}
                    </div>
                    <div className="price">
                        ${this.props.data.price}
                    </div>
                </div>
                <div className="thumbnail" style={thumbnailStyle}></div>
            </div >
        )
    }
}