import * as React from 'react';

interface Props {
    link: string,
    hideFullPhoto: () => void
}

export default class Photo extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        document.body.style.overflowY = 'hidden';

        return (
            <div className="Photo-Container">
                <div className="Photo-Background" onClick={this.props.hideFullPhoto}></div>
                <div className="Photo" style={{ backgroundImage: `url(${this.props.link})` }}></div>
            </div>
        )
    }
}