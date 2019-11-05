import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {Cookies} from "react-cookie";

interface Props {
    setUser: Function,
    user: any,
    cookies: Cookies
}

class Logout extends Component <Props, {}>{

    constructor(props : Props) {
        super(props);
        // Remove User Cookie and state
        this.props.cookies.remove('username');
        this.props.setUser(null);
    }

    render () {
        // Reload the page to go back to the login page
        // ?logout is to indicate to the login page to display logout successfully
        return <Redirect to='/?logout'/>;
    }
}

export default (Logout);