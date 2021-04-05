import * as React from 'react';
import SelectionList from './SelectionList';
import data from '../../lib/newListingData';
import { getListItems } from '../../lib/database';

interface Props {
    label: 'stones' | 'benefits'
}

interface State {
    listItems: string[]
    dropdownVisible: boolean,
    selections: string[],
    inputValue: string
}

export default class InputDropdown extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { listItems: [], dropdownVisible: false, selections: [], inputValue: '' }

        getListItems()
            .then(lists => {
                this.setState({
                    listItems: lists[this.props.label]
                })
            })

        this.showDropdown = this.showDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
        this.addToSelection = this.addToSelection.bind(this);
        this.removeSelection = this.removeSelection.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        }), () => {
            data[this.props.label] = this.state.selections;
        })
    }

    removeSelection(item: string) {
        let newSelectionArr = this.state.selections.filter(s => s !== item);

        this.setState({
            selections: newSelectionArr
        }, () => {
            data[this.props.label] = this.state.selections;
        })
    }

    handleChange(e: React.ChangeEvent) {
        this.setState({
            inputValue: (e.target as HTMLInputElement).value
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
                    <input className="dropdown-input" type="text" onFocus={this.showDropdown} onBlur={this.hideDropdown} onChange={this.handleChange} />
                    <button type="button" className="dropdown-btn" onClick={() => this.addToSelection(this.state.inputValue)}>Add</button>
                </div>
                <div className="dropdown" style={style}>{items}</div>
                <SelectionList items={this.state.selections} removeSelection={this.removeSelection} />
            </div>
        )
    }
}