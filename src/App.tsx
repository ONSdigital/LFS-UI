import React from 'react';
import {Route, RouteProps} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './pages/Home';
import {Login} from './auth/Login';
import {Unauthorized} from './auth/Unauthroized';
import {Admin} from './pages/Admin';
import {Outputs} from './pages/Outputs';
import {verifyUserToken} from './auth/auth';
import Logout from './auth/Logout';
import {File_Upload} from "./pages/File_Upload";
import {Period} from "./pages/Period";
import { New_Run } from './pages/New_Run';

interface Props {
}

interface State {
    user?: User | null
}

interface Role {
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
    displayName = App.name;

    constructor(props: Props) {
        super(props);

        this.setUser.bind(this);

        this.state = {user: null};
        this.getCurrentUser()
    }

    getCurrentUser = () => {
        let user = verifyUserToken();
        if (user !== undefined) {
            console.log("User verifed, logging in");
            this.state = {user: user}
        }
    };

    setUser = (user: User) => {
        this.setState({user: user});
    };

    PrivateRoute = ({component: Component, page_id, ...rest}: PRProps) => {

        if (!this.state.user) {
            return (<Route {...rest} render={(props) => (<Login setUser={this.setUser} user={this.state.user}/>)}/>)
        } else {
            if (page_id === 0) {
                return (
                    <Route {...rest} render={(props) => (<Logout setUser={this.setUser} user={this.state.user}/>)}/>)
            }

            if (this.state.user.role.pages.includes(page_id)) {
                return (<Route {...rest} render={(props) => (<Component {...props} />)}/>)
            } else {
                return (<Route {...rest} render={(props) => (<Unauthorized/>)}/>)
            }
        }
    };

    render() {
        return (
            <Layout>
                <this.PrivateRoute exact path='/' component={Home} page_id={1}/>
                <this.PrivateRoute exact path='/Dashboard' component={Home} page_id={2}/>
                <this.PrivateRoute exact path='/Outputs' component={Outputs} page_id={3}/>
                <this.PrivateRoute exact path='/Admin' component={Admin} page_id={9}/>
                <this.PrivateRoute exact path='/File_Upload' component={File_Upload} page_id={4}/>
                <this.PrivateRoute exact path='/Period' component={Period} page_id={5}/>
                <this.PrivateRoute exact path='/New_Run' component={New_Run} page_id={6}/>
                <this.PrivateRoute exact path='/logout' component={Logout} page_id={0}/>

                <Route exact path='/login' component={Login}/>

            </Layout>
        );
    }
}