import React, { Component, ChangeEvent } from 'react';
import { ONSTextInput } from '../components/ONSTextInput';
import { ONSPasswordInput } from '../components/ONSPasswordInput';
import { ONSButton } from '../components/ONSButton';
import {loginUser} from './auth'

interface Props {
  setUser: Function,
  user: any
}

interface State{
  Users: any,
  username: string,
  password: string,
}

export class Login extends Component <Props, State> {
  displayName = Login.name
  constructor(props: Props) {
    super(props);

    this.state = {
      Users: null,
      username: '',
      password: ''
    }
  }

  login = () => {
    let user = loginUser(this.state.username, this.state.username)
    if(user){
      this.props.setUser(user)
    }
  }

  handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({username: e.target.value})
  }

  handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({password: e.target.value})
  }
  
  render() {
    return (
      <div style={{marginTop: "50px"}} className="container ">
        <br/>
        <section>
          <div style={{maxWidth:"351px"}}>
            <ONSTextInput ref="username" label="Username" onChange = {this.handleUserName}/>
            <ONSTextInput ref="password" label="Password" password={true} onChange = {this.handlePassword}/>
            <ONSButton label="Log In" onClick={() => this.login()} primary={false} small={false}/>
          </div>
        </section>
    </div>
    );
  }
}
