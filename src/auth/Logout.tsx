import React, {Component} from 'react';
import {Cookies} from "react-cookie";
import {GenericNotFound} from "../pages/GenericNotFound";

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

        // Reload the page to go back to the login page
        // ?logout is to indicate to the login page to display logout successfully
        window.location.href = '/?logout'
    }

    render () {

        return <GenericNotFound/>
    }
}

export default (Logout);