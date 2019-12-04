import React, {Fragment} from "react";
import {Link, useLocation} from "react-router-dom";

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
        link: "/dashboard",
        label: "Dashboard"
    },
    {
        link: "/manage-batch",
        label: "Manage Batch",
        hidden: true,
        nonGenericPage: true
    },
    {
        link: "/survey-import",
        label: "Import Survey",
        hidden: true,
        nonGenericPage: true
    },
    {
        link: "/new-batch",
        label: "New Batch"
    },

    {
        link: "/view-data",
        label: "View Data"
    },
    {
        link: "/import/overview",
        label: "Import"
    },
    {
        link: "/export",
        label: "Export"
    },
    {
        link: "/admin",
        label: "User Management"
    }
];

export function HeaderNavigation(props: Props) {
    let location = useLocation();

    // Get Previous Page Set current false and hide if its a hidden header
    let links: LinkRow[] = headerLinks;
    let link = links.find(x => x.current);
    if (link !== undefined) {
        if (link.nonGenericPage) link.hidden = true;
        link.current = false;
    }

    // Set Current Page and set to visible if its a hidden header
    link = links.find(x => "/" + x.link.split("/")[1] === "/" + location.pathname.split("/")[1]);
    if (link !== undefined) {
        link.current = true;
        if (link.nonGenericPage) {
            link.hidden = false;
            // link.link = location.pathname
        }
    } else {
        if (location.pathname.split("/")[1].length === 0) {
            link = links.find(x => x.label === "Dashboard");
            if (link !== undefined) {
                link.current = true;
            }
        }
    }

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
                                    <Fragment key={index}>
                                        <li className={"header-nav__item " + (link.current && "header-nav__item--active")}>
                                            <Link className="header-nav__link"
                                                  to={link.nonGenericPage ? location : link.link}>{link.label}</Link>
                                        </li>
                                    </Fragment>
                                )
                                :
                                <Fragment key={0}>
                                    <li className={"header-nav__item header-nav__item--active"}>
                                        <a href={"/"}
                                           className="header-nav__link">Login
                                        </a>
                                    </li>
                                </Fragment>
                        }
                    </ul>
                </nav>
            </div>
        </>
    );
}