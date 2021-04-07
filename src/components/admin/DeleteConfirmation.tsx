import * as React from 'react';

interface Props {
    id: string,
    title: string,
    hideDeleteConfirmation: () => void,
    deleteListing: (id: string) => void
}

export default class DeleteConfirmation extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

    }

    render() {
        return (
            <div className="DeleteConfirmation">
                <div className="dialog-box">
                    <h3>Are you sure you want to delete "{this.props.title}"?</h3>
                    <div className="buttons">
                        <button className="cancel" onClick={this.props.hideDeleteConfirmation}>Cancel</button>
                        <button className="delete" onClick={() => this.props.deleteListing(this.props.id)}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}