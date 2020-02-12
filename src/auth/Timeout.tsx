import React, {Component} from "react";
import DocumentTitle from "react-document-title";
import {Link} from "react-router-dom";
import {ONSPanel} from "../components/ONS_DesignSystem/ONSPanel";

interface Props {
    setIsTimeout: Function
}

export class Timeout extends Component <Props, {}> {
    displayName = Timeout.name;

    removeTimeout = () => {
        this.props.setIsTimeout(false);
    };

    render() {
        return (
            <DocumentTitle title='Labour Force Survey: Timeout'>
                <div className={"container"}>
                    <br/>
                    <div className="grid">
                        <div className="grid__col col-8@m">
                            <main id="main-content" className="page__main ">
                                <h1>Your session has timed out due to inactivity</h1>
                                    <ONSPanel label={"To protect your information we have timed you out."}>
                                        <p>To protect your information we have timed you out.</p>
                                    </ONSPanel>
                                <br/>
                                <p>You will need to <Link to={"/"} onClick={this.removeTimeout} className={"breadcrumb__link"}>log back in
                                </Link> to access the system again.</p>
                            </main>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}
