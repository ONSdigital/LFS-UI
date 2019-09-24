import React, { Component } from 'react';
import { ONSLabel } from '../components/ONSLabel';
import { ONSTextInput } from '../components/ONSTextInput';
import { ONSPasswordInput } from '../components/ONSPasswordInput';
import { ONSButton } from '../components/ONSButton';
import { ONSCheckbox } from '../components/ONSCheckbox';
import { ONSSelect } from '../components/ONSSelect';
// import "./Login.css";

export class Login extends Component {
  displayName = Login.name
  constructor(props) {
    super(props);
  }

  login = () => {
      if(this.refs.username.value === "Admin"){
          let user = { 
            name: "Admin",
            role: {
              name: "Admin",
              pages: [0,1,2,3,4,5,6,7,8,9]
            }
          }
          this.props.setUser(user)
      }
  }
  render() {
    return (
      <div style={{marginTop: "50px"}} className="container ">
        <br/>
        <section>
          <div style={{maxWidth:"351px"}}>
            <ONSTextInput ref="username" label="Username"/>
            <ONSTextInput ref="password" label="Password" password={true}/>
            <br/>
            <ONSButton label="Log In" onClick={() => this.login()} primary={false} small={false}/>
          </div>
        </section>
    </div>
    );
  }
}
