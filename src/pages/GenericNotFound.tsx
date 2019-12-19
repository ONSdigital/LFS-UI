import React, {Component} from "react";
import {ONSButton} from "../components/ONS_DesignSystem/ONSButton";
import DocumentTitle from "react-document-title";
import {Link} from "react-router-dom";

interface Props {
    label?: string
}

export class GenericNotFound extends Component <Props, {}> {
    displayName = GenericNotFound.name;

    render() {
        return (
            <DocumentTitle title='LFS: 404 Page Not Found'>
                <div className={!this.props.label ? "container" : ""}>
                    <br/>
                    <h1>Page Not Found</h1>
                    <p>{this.props.label ? this.props.label : "The page you are trying to access does not exist"}</p>
                    <Link to={"/"}>
                        <ONSButton label={"Return to Dashboard"} primary={true} small={false} />
                    </Link>
                </div>
            </DocumentTitle>

        );
    }
}
