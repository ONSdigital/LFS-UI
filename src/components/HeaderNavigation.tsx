import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";

interface Props {
    loggedIn: boolean
}

interface LinkRow {
    link: string,
    label: string,
    current?: boolean
    hidden?: boolean
    nonGenericPage?: boolean
}

let headerLinks = [
    {
        link: "/Dashboard",
        label: "Dashboard"
    },
    {
        link: "/View_Monthly_Batch",
        label: "Manage Batch",
        hidden: true,
        nonGenericPage: true
    },
    {
        link: "/surveyUpload",
        label: "Import Survey",
        hidden: true,
        nonGenericPage: true
    },
    {
        link: "/New_Batch",
        label: "New Batch"
    },
    {
        link: "/Import",
        label: "Import"
    },
    {
        link: "/ViewData",
        label: "View Data"
    },
    {
        link: "/Outputs",
        label: "Outputs"
    },
    {
        link: "/Link-to-item-5",
        label: "Link 5"
    },
    {
        link: "/Admin",
        label: "User Management"
    },

];

export function HeaderNavigation(props: Props) {
    let location = useLocation();

    // Get Previous Page Set current false and hide if its a hidden header
    let links: LinkRow[] = headerLinks;
    let link = links.find(x => x.current);
    if (link !== undefined) {
        if (link.nonGenericPage) link.hidden = true;
        link.current = false;
    } else console.log("There is no current!");

    // Set Current Page and set to visible if its a hidden header
    link = links.find(x => x.link === '/' + location.pathname.split('/')[1]);
    if (link !== undefined) {
        link.current = true;
        if (link.nonGenericPage) {
            link.hidden = false;
            // link.link = location.pathname
        }
    } else console.log("Somehow it's undefined!");

    return (
        <>
            <div className="container container--gutterless@xs@m col-8">
                <nav className="header-nav js-header-nav" id="main-nav" aria-label="Main menu"
                     data-ga-element="navigation">
                    <ul className="header-nav__list" aria-label="" role="menubar">
                        {
                            props.loggedIn ?
                                links.map((link, index) =>
                                    !link.hidden &&
                                    <LinkContainer key={index} to={link.link}>
                                        <li className={"header-nav__item " + (link.current && "header-nav__item--active")}>
                                            <Link className="header-nav__link" to={link.link}>{link.label}</Link>
                                        </li>
                                    </LinkContainer>
                                )
                                :
                                <LinkContainer key={0} to={"/"}>
                                    <li className={"header-nav__item header-nav__item--active"}>
                                        <a href={"/"}
                                           className="header-nav__link">Login
                                        </a>
                                    </li>
                                </LinkContainer>
                        }
                    </ul>
                </nav>
            </div>
        </>
    );
}