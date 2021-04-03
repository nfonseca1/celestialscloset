import * as React from 'react';
import SelectionList from './SelectionList';

interface Props {
    label: string
}

interface State {
    listItems: string[]
    dropdownVisible: boolean,
    selections: string[]
}

export default class InputDropdown extends React.Component<Props, State> {
    constructor(props: { label: string }) {
        super(props);

        this.state = { listItems: ['Aqua Aura Quartz', 'Rose Quartz', 'Turquoise', 'Sun Quartz', 'Obsidian'], dropdownVisible: false, selections: [] }

        this.showDropdown = this.showDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
        this.addToSelection = this.addToSelection.bind(this);
        this.removeSelection = this.removeSelection.bind(this);
    }

    showDropdown() {
        this.setState({
            dropdownVisible: true
        })
    }


    hideDropdown() {
        setTimeout(() => {
            this.setState({
                dropdownVisible: false
            })
        }, 100)
    }

    addToSelection(item: string) {
        if (this.state.selections.filter(s => s === item).length > 0) return;
        this.setState((state) => ({
            selections: [...state.selections, item]
        }))
    }

    removeSelection(item: string) {
        let newSelectionArr = this.state.selections.filter(s => s !== item);

        this.setState({
            selections: newSelectionArr
        })
    }

    render() {
        let style: React.CSSProperties = {
            display: this.state.dropdownVisible ? 'inline-block' : 'none'
        }

        let items: JSX.Element[] = this.state.listItems.map(l => {
            return <div className="list-item" id={l} key={l + '-item'} onClick={() => this.addToSelection(l)}>{l}</div>
        })

        return (
            <div className="stones">
                <div className="input">
                    <input className="dropdown-input" type="text" onFocus={this.showDropdown} onBlur={this.hideDropdown} />
                    <button type="button" className="dropdown-btn">Add</button>
                </div>
                <div className="dropdown" style={style}>{items}</div>
                <SelectionList items={this.state.selections} removeSelection={this.removeSelection} />
            </div>
        )
    }
}