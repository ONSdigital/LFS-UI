import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';

interface Props {
    links: Link[],
    loggedIn: boolean
}

interface Link {
    link: string,
    label: string,
    current?: boolean
    hidden?: boolean
}

interface State {
    links: Link[]
}

export class HeaderNav extends Component <Props, State> {
    displayName = HeaderNav.name;

    constructor(props: Props) {
        super(props);
        this.state = {links: props.links};

        let links = props.links;
        let link = links.find(x => x.current);
        link !== undefined ? link.current = false : console.log("there is no current!");

        let pathname = window.location.pathname.split('/');
        link = links.find(x => x.link === '/' + pathname[1]);
        if (link !== undefined) {
            link.current = true;
            link.hidden = false;
        } else console.log("Page not in list");
        this.setState({links: links});
    }

    changePage = (label: string) => {
        let links = this.props.links;
        let link = links.find(x => x.current);
        if (link !== undefined) {
            if (link.hidden) link.hidden = true;
            link.current = false;
        } else console.log("there is no current!");
        link = links.find(x => x.label === label);
        link !== undefined ? link.current = true : console.log("somehow it's undefined!");
        this.setState({links: links});
    };

    render() {
        return (
            <div className="container container--gutterless@xs@m col-8">
                <nav className="header-nav js-header-nav" id="main-nav" aria-label="Main menu"
                     data-ga-element="navigation">
                    <ul className="header-nav__list" aria-label="" role="menubar">
                        {
                            this.props.loggedIn ?
                                this.state.links.map((link, index) =>
                                    link.hidden ?
                                        <></>
                                        :
                                        <LinkContainer  key={index} to={link.link}>
                                            <li className={"header-nav__item " + (link.current === true ? "header-nav__item--active" : "")}
                                                onClick={() => this.changePage(link.label)}>
                                                <a href={link.link}
                                                   className="header-nav__link">{link.label}
                                                </a>
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
        );
    }
}
