import * as React from 'react';
import SelectionList from './SelectionList';
import data from '../../lib/newListingData';

interface Props {
    selections: string[]
}

interface State {
    dropdownVisible: boolean,
    selections: string[]
}

enum Chakras {
    Root = "Root",
    Sacral = "Sacral",
    'Solar Plexus' = "Solar Plexus",
    Heart = "Heart",
    Throat = "Throat",
    'Third Eye' = "Third Eye",
    Crown = "Crown"
}

export default class ChakraDropdown extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { dropdownVisible: false, selections: [] }

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.addToSelection = this.addToSelection.bind(this);
        this.removeSelection = this.removeSelection.bind(this);
    }

    toggleDropdown() {
        this.setState((state) => ({
            dropdownVisible: !state.dropdownVisible
        }))
    }

    addToSelection(item: string) {
        if (this.state.selections.filter(s => s === item).length > 0) return;
        this.setState((state) => ({
            selections: [...state.selections, item],
            dropdownVisible: false
        }), () => {
            data.chakras = this.state.selections
        })
    }

    removeSelection(item: string) {
        let newSelectionArr = this.state.selections.filter(s => s !== item);

        this.setState({
            selections: newSelectionArr
        }, () => {
            data.chakras = this.state.selections
        })
    }

    render() {
        let style: React.CSSProperties = {
            display: this.state.dropdownVisible ? 'inline-block' : 'none'
        }

        let itemsData: string[] = this.state.selections;
        if (itemsData.length === 0) {
            itemsData = this.props.selections || [];
        }

        return (
            <div className="chakras">
                <div className="dropdown-btn" onClick={this.toggleDropdown}>Select Chakras</div>
                <div className="dropdown" style={style}>
                    <div className="list-item" id="root" onClick={() => this.addToSelection(Chakras.Root)}>Root</div>
                    <div className="list-item" id="sacral" onClick={() => this.addToSelection(Chakras.Sacral)}>Sacral</div>
                    <div className="list-item" id="solar-plexus" onClick={() => this.addToSelection(Chakras['Solar Plexus'])}>Solar Plexus</div>
                    <div className="list-item" id="heart" onClick={() => this.addToSelection(Chakras.Heart)}>Heart</div>
                    <div className="list-item" id="throat" onClick={() => this.addToSelection(Chakras.Throat)}>Throat</div>
                    <div className="list-item" id="third eye" onClick={() => this.addToSelection(Chakras['Third Eye'])}>Third Eye</div>
                    <div className="list-item" id="crown" onClick={() => this.addToSelection(Chakras.Crown)}>Crown</div>
                </div>
                <SelectionList items={itemsData} removeSelection={this.removeSelection} />
            </div>
        )
    }
}