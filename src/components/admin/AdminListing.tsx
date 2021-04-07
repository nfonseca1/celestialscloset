import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    id: string,
    photo: string,
    title: string,
    price: number
}

export default class AdminListing extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="AdminListing">
                <div className="image-container">
                    <img src={this.props.photo} />
                </div>
                <div className="title">{this.props.title}</div>
                <div className="price">{this.props.price}</div>
                <div className="toolbar">
                    <Link to={`/admin/listings/new/${this.props.id}`}>
                        <div className="edit">Edit</div>
                    </Link>
                    <div className="delete">Delete</div>
                </div>
            </div>
        )
    }
}