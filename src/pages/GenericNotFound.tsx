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
                    <h1>Page not found</h1>
                    {this.props.label ? <p>this.props.label</p> :
                        <>
                            <p>If you entered a web address, check it is correct.</p>
                            <p>If you pasted the web address, check you copied the whole address.</p>
                            <p>If the web address is correct or you selected a link or button, <a href="#">contact us</a> for more help.</p>
                        </>
                    }
                    <Link to={"/"}>
                        <ONSButton label={"Return to Home"} primary={true} small={false}/>
                    </Link>
                </div>
            </DocumentTitle>

        );
    }
}
