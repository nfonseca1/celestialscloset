import * as React from 'react';
import ReactDOM from 'react-dom';
import Input from './components/admin/Input';
import { validateUsername, validateName, validatePassword } from './lib/validation';
import './styles/admin.scss';

interface State {
    username?: string,
    password?: string
}

class AdminLogin extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = { username: '', password: '' }

        this.handleInputUpdate = this.handleInputUpdate.bind(this);
    }

    handleInputUpdate(name: string, value: string) {
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className="AdminLogin">
                <h1>Admin Account Login</h1>

                <form action="/admin" method="POST">
                    <Input name={'username'} label={'Username'} handleInputUpdate={this.handleInputUpdate} error={''} isPassword={false} />
                    <Input name={'password'} label={'Password'} handleInputUpdate={this.handleInputUpdate} error={''} isPassword={true} />
                    <button>Login</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<AdminLogin />, document.querySelector("#root"))