import {ONSSubmitButton} from "../components/ONSSubmitButton";
import React, {ChangeEvent, Component} from 'react';
import {ONSTextInput} from '../components/ONSTextInput';
import {loginUser} from './auth';
import {Cookies} from "react-cookie";


interface Props {
    setUser: Function,
    user: any,
    cookies: Cookies
}

interface State{
  Users: any,
  username: string,
  password: string,
}

export class Login extends Component <Props, State> {
    displayName = Login.name;

    constructor(props: Props) {
        super(props);

        this.state = {
            Users: null,
            username: '',
            password: ''
        };
    }

    login = async () => {
        let user = await loginUser(this.state.username, this.state.password, this.props.cookies);
        this.props.setUser(user);
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
            <div style={{marginTop: "50px"}} className="container ">
                <br/>
                <section>
                    <form onSubmit={this.handleSubmit}>
                        <div style={{maxWidth: "351px"}}>
                            <ONSTextInput ref="username" autoFocus={true} label="Username"
                                          onChange={this.handleUserName}/>
                            <ONSTextInput ref="password" label="Password" password={true}
                                          onChange={this.handlePassword}/>
                            <ONSSubmitButton label="Log In" primary={true}
                                             small={false}/>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}
