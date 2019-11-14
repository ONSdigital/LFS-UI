import React from 'react';
import {Route, RouteProps, Switch} from "react-router-dom";
import {Layout} from './components/Layout';
import {Dashboard} from './pages/Dashboard';
import {VariableDefinitions} from './pages/VariableDefinitions';
import {Login} from './auth/Login';
import {Admin} from './pages/Admin';
import {Outputs} from './pages/Outputs';
import Logout from './auth/Logout';
import {Import} from "./pages/Import";
import {New_Batch} from './pages/New_Batch';
import {View_Monthly_Batch} from './pages/View_Monthly_Batch';
import {GenericNotFound} from "./pages/GenericNotFound";
import {Cookies, withCookies} from "react-cookie";
import {SurveyFileUpload} from "./pages/SurveyFileUpload";
import {FileUploadProgress} from './pages/FileUploadProgress';
import DocumentTitle from "react-document-title";

interface Props {
    cookies: Cookies
}

interface State {
    user?: User | null
}

interface User {
    name: string | null
}

interface PRProps extends RouteProps {
    component: new (props: any) => React.Component,
    page_id: number;
}

class App extends React.Component<Props, State> {
    displayName = App.name;

    constructor(props: Props) {
        super(props);

        this.state = {user: null};
        this.setUser.bind(this);
    }

    componentDidMount(): void {
        this.getCurrentUser();
    }

    getCurrentUser = () => {
        let user = this.props.cookies.get('username') || null;
        if (user !== null || user !== "") {
            this.setState({user: user});
        }
    };

    setUser = (user: User) => {
        this.setState({user: user});
    };

    PrivateRoute = ({component: Component, page_id, ...rest}: PRProps) => {
        if (!this.state.user) {
            return (<Route {...rest} render={(props) => (
                <Login setUser={this.setUser} user={this.state.user} cookies={this.props.cookies}/>)}/>)
        } else {
            if (page_id === 0) { // Page ID 0 : logout page
                return (
                    <Route {...rest} render={(props) => (
                        <Logout setUser={this.setUser} user={this.state.user} cookies={this.props.cookies}/>)}/>)
            }
            return (<Route {...rest} render={(props) => (<Component {...props} />)}/>)

            // Required if Users have role management
            // if (this.state.user.role.pages.includes(page_id)) {
            //     return (<Route {...rest} render={(props) => (<Component {...props} />)}/>)
            // } else {
            //     return (<Route {...rest} render={(props) => (<Unauthorized/>)}/>)
            // }
        }
    };

    render() {
        return (
            <DocumentTitle title="Labour Force Survey">
                <Layout loggedIn={!!(this.state.user !== null || "")}>
                    <Switch>
                        <this.PrivateRoute exact path='/' component={Dashboard} page_id={1}/>
                        <this.PrivateRoute exact path='/Dashboard' component={Dashboard} page_id={2}/>
                        <this.PrivateRoute exact path='/New_Batch' component={New_Batch} page_id={3}/>
                        <this.PrivateRoute exact path='/View_Monthly_Batch/:batchtype/:year/:period/:summary?' component={View_Monthly_Batch} page_id={4}/>
                        <this.PrivateRoute exact path='/surveyUpload/:survey/:week/:month/:year' component={SurveyFileUpload} page_id={5}/>
                        <this.PrivateRoute exact path='/Outputs' component={Outputs} page_id={6}/>
                        <this.PrivateRoute exact path='/Variable_Definitions' component={VariableDefinitions} page_id={10}/>
                        <this.PrivateRoute exact path='/Import' component={Import} page_id={7}/>
                        <this.PrivateRoute exact path='/Address' component={FileUploadProgress} page_id={8}/>
                        <this.PrivateRoute exact path='/Admin' component={Admin} page_id={9}/>
                        <this.PrivateRoute exact path='/logout' component={Logout} page_id={0}/>
                        <Route exact path='/login' component={Login}/>
                        <Route component={GenericNotFound}/>
                    </Switch>
                </Layout>
            </DocumentTitle>
        );
    }
}

export default withCookies(App);