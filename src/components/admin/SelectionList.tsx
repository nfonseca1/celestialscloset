import * as React from 'react';

interface Props {
    items: string[]
    removeSelection: (item: string) => void
}

export default class SelectionList extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {

        let selections: JSX.Element[] = this.props.items.map(i => {

            return (
                <div className="selection-container" key={i}>
                    <div className="selection-item">{i}</div>
                    <div className="remove-selection-btn" onClick={() => this.props.removeSelection(i)}>X</div>
                </div>
            )
        })

        return (
            <div className="SelectionList">
                {selections}
            </div>
        )
    }
}