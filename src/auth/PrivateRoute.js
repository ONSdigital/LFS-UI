import React, { Component } from 'react';
import { Route } from 'react-router';


export default class PrivateRoute extends Component {
    displayName = PrivateRoute.name
    constructor(props) {
        super(props);
    }

    render() {
        if(this.state.authenticated){
            return (
                this.props.component
            );
        }else if(this.state.loggedin){
            return (
                <Redirect to='/unauthorised' />
            );
        }else{
            return (
                <Redirect to='/login' />
            );
        }
    }
}
