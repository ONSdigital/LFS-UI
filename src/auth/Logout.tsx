import React, {Component} from 'react';
import { Redirect } from 'react-router';

interface Props {
    setUser: Function,
    user: any
  }
  
interface State{
  user: any
}

let Logout;

Logout = class extends Component <Props, State>{
    componentWillMount () {
        localStorage.clear();
        let user = null
        this.props.setUser(user)
    }

    render () {
        return <Redirect to='/'/>;
    }
};

export default (Logout);