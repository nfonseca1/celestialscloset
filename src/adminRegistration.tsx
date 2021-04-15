import * as React from 'react';
import ReactDOM from 'react-dom';
import Input from './components/admin/Input';
import { validateUsername, validateName, validatePassword } from './lib/validation';
import './styles/admin.scss';

interface State {
    username?: {
        value: string,
        error: string
    },
    firstname?: {
        value: string,
        error: string
    },
    lastname?: {
        value: string,
        error: string
    },
    password?: {
        value: string,
        error: string
    },
    passwordconfirm?: {
        value: string,
        error: string
    }
}

class AdminRegistration extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            username: {
                value: '',
                error: ''
            },
            firstname: {
                value: '',
                error: ''
            },
            lastname: {
                value: '',
                error: ''
            },
            password: {
                value: '',
                error: ''
            },
            passwordconfirm: {
                value: '',
                error: ''
            }
        }

        this.handleInputUpdate = this.handleInputUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputUpdate(name: string, value: string) {
        this.setState({
            [name]: {
                value: value,
                error: ''
            }
        })
    }

    handleSubmit(e: React.MouseEvent) {
        e.preventDefault();

        let error = false;
        let usernameErr = validateUsername(this.state.username.value);
        let firstnameErr = validateName(this.state.firstname.value);
        let lastnameErr = validateName(this.state.lastname.value);
        let passwordErr = validatePassword(this.state.password.value);

        if (usernameErr !== '') error = true;
        if (firstnameErr !== '') error = true;
        if (lastnameErr !== '') error = true;
        if (passwordErr !== '') error = true;

        let passwordConfirmErr = '';
        if (this.state.password.value !== this.state.passwordconfirm.value) {
            error = true;
            passwordConfirmErr = 'Passwords do not match';
        }

        if (error) {
            this.setState((state) => ({
                username: { value: state.username.value, error: usernameErr },
                firstname: { value: state.firstname.value, error: firstnameErr },
                lastname: { value: state.lastname.value, error: lastnameErr },
                password: { value: state.password.value, error: passwordErr },
                passwordconfirm: { value: state.passwordconfirm.value, error: passwordConfirmErr }
            }))
        }
        else {
            document.querySelector("form").submit();
        }
    }

    render() {
        return (
            <div className="AdminLogin">
                <h1>Admin Account Registration</h1>

                <form action="/admin/register" method="POST">
                    <Input name={'username'} label={'Username'} handleInputUpdate={this.handleInputUpdate} error={this.state.username.error} isPassword={false} />
                    <Input name={'firstname'} label={'Firstname'} handleInputUpdate={this.handleInputUpdate} error={this.state.firstname.error} isPassword={false} />
                    <Input name={'lastname'} label={'Lastname'} handleInputUpdate={this.handleInputUpdate} error={this.state.lastname.error} isPassword={false} />
                    <Input name={'password'} label={'Password'} handleInputUpdate={this.handleInputUpdate} error={this.state.password.error} isPassword={true} />
                    <Input name={'passwordconfirm'} label={'Confirm Password'} handleInputUpdate={this.handleInputUpdate} error={this.state.passwordconfirm.error} isPassword={true} />
                    <button type="button" onClick={this.handleSubmit}>Register</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<AdminRegistration />, document.querySelector("#root"))