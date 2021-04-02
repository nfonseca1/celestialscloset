import * as React from 'react';

interface Props {
    name: string,
    label: string,
    handleInputUpdate: (name: string, value: string) => void,
    error: string,
    isPassword?: boolean
}

export default class Input extends React.Component<Props, { value: string }> {
    constructor(props: Props) {
        super(props);

        this.state = { value: '' }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            value: e.target.value
        })
        e.preventDefault();

        this.props.handleInputUpdate(this.props.name, e.target.value);
    }

    render() {
        return (
            <div className="Input">
                <div className="input-label">{this.props.label}</div>
                <div className="input-error">{this.props.error}</div>
                <input type={this.props.isPassword ? 'password' : 'text'} name={this.props.name} onChange={this.handleChange} value={this.state.value} />
            </div>
        )
    }
}