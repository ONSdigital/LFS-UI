import {ONSSubmitButton} from "../components/ONSSubmitButton";
import React, {ChangeEvent, Component} from 'react';
import {ONSTextInput} from '../components/ONSTextInput';
import {loginUser} from './auth';
import {Cookies} from "react-cookie";
import {ONSPanel} from "../components/ONSPanel";


interface Props {
    setUser: Function,
    user: any,
    cookies: Cookies
}

interface Panel {
    label: string,
    visible: boolean
    status: string
}

interface State{
  Users: any,
  username: string,
  password: string,
  panel: Panel
}

export class Login extends Component <Props, State> {
    displayName = Login.name;

    constructor(props: Props) {
        super(props);
        let panel = {
            label: '',
            visible: false,
            status: ''
        };

        if (window.location.search.endsWith('logout')) {
            panel = {
                label: 'Successfully Logged Out',
                visible: true,
                status: 'success'
            };
            window.history.pushState({}, document.title, "/");
        }

        this.state = {
            Users: null,
            username: '',
            password: '',
            panel: panel
        };
    }

    login = async () => {
        let user = await loginUser(this.state.username, this.state.password, this.props.cookies);
        this.props.setUser(user);
        if (user === null) {
            this.setState({
                username: '',
                password: '',
                panel: {
                    label: 'Credentials entered are incorrect',
                    visible: true,
                    status: 'error'
                }
            })
        }
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        this.login();
    };

    handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({username: e.target.value})
    };

    handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({password: e.target.value})
    };

    render() {
        return (
            <div className="container ">
                <ONSPanel label={this.state.panel.label} hidden={!this.state.panel.visible} status={this.state.panel.status}>
                    <p>{this.state.panel.label}</p>
                </ONSPanel>
                <br/>
                <section>
                    <form id={'loginForm'} onSubmit={this.handleSubmit}>

                        <div style={{maxWidth: "351px"}}>
                            <ONSTextInput ref="username" autoFocus={true} label="Username"
                                          value={this.state.username} onChange={this.handleUserName}/>
                            <ONSTextInput ref="password" label="Password" password={true}
                                          value={this.state.password} onChange={this.handlePassword}/>
                            <ONSSubmitButton label="Log In" primary={true}
                                             small={false}/>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}
