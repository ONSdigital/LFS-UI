import React, {Component} from "react";
import {Link} from "react-router-dom";

interface Props {
    List: any
    Current: string
}

export class ONSBreadcrumbs extends Component <Props, {}> {
    render() {
        return(
            <nav className="breadcrumb" aria-label="Breadcrumb">
                <ol className="breadcrumb__items">
                    {this.props.List.map((item:any, index: number) => (
                        <li key={index} id={"breadcrumb-" + (index + 1)} className="breadcrumb__item u-fs-s">
                            <Link to={"/" + item.link} className="breadcrumb__link">{item.name}</Link>
                        </li>
                    ))}
                    
                    <li id={"breadcrumb-" + String(this.props.List.length + 1) } className="breadcrumb__item u-fs-s breadcrumb__item--current">
                        {this.props.Current}
                    </li>
                </ol>
            </nav>
        )
    }
}