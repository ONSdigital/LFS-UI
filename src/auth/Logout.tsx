import React, {Component} from 'react';
import { Redirect } from 'react-router';
import {Cookies} from "react-cookie";

interface Props {
    setUser: Function,
    user: any,
    cookies: Cookies
}

class Logout extends Component <Props, {}>{
    componentWillMount () {
        this.props.cookies.set('username', "", { path: '/'});
        this.props.setUser(null);
    }

    render () {
        return <Redirect to='/'/>;
    }
}

export default (Logout);