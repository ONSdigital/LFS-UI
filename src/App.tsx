import React, { Component, ReactNode } from 'react';
import logo from './logo.svg';
// import './App.css';
import { Route, RouteProps } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './auth/Login';
import { Unauthorized } from './auth/Unauthroized';
import { Admin } from './pages/Admin';
import { Outputs } from './pages/Outputs';

interface Props {
}

interface State {
  user?: User | null
}

interface Role{
    name: string,
    pages: number[]
}

interface User {
    name: string,
    role: Role
}

interface PRProps extends RouteProps {
  component: new (props: any) => React.Component, 
  page_id: number;
}


export default class App extends React.Component<Props, State> {
    displayName = App.name
    constructor(props: Props) {
        super(props);
        this.state = {user: null}
    }

    setUser = (user: User) => {
      this.setState({ user: user });
    }

    PrivateRoute = ({ component: Component, page_id: page_id,  ...rest } : PRProps) => {
      if(!this.state.user){
        return (<Route {...rest} render={(props) => (<Login setUser={this.setUser}/>)} />)
      }else{
        if(this.state.user.role.pages.includes(page_id)){
            return (<Route {...rest} render={(props) => (<Component {...props} />)} />)
        }else{
          return (<Route {...rest} render={(props) => (<Unauthorized />)} />)
        }
      }
    }

    render() {
      return (
        <Layout>
          <this.PrivateRoute exact path='/' component={Home} page_id={1}/>
          <this.PrivateRoute exact path='/Dashboard' component={Home} page_id={2}/>
          <this.PrivateRoute exact path='/Outputs' component={Outputs} page_id={3}/>
          <this.PrivateRoute exact path='/Admin' component={Admin} page_id={9}/>
          <Route exact path='/login' component={Login} />
        </Layout>
      );
    }
 }