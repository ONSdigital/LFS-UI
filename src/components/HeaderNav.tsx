import React, {Component, Fragment} from 'react';

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
            link.link = window.location.pathname;
        } else {
            console.log("Page not in list");
            link = links.find(x => x.label === 'Dashboard');
            if (link !== undefined) {
                link.current = true;
            }
        }
        this.state = {links: links};
    }

    changePage = (label: string) => {
        let links = this.props.links;
        let link = links.find(x => x.current);
        if (link !== undefined) {
            if (link.hidden) link.hidden = true;
            link.current = false;
        } else console.log("there is no current!");
        link = links.find(x => x.label === label);
        if (link !== undefined) {
            link.current = true;
            if (link.hidden) {
                link.hidden = false;
                link.link = window.location.pathname
            }
        } else console.log("somehow it's undefined!");
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
                                    !link.hidden &&
                                        <Fragment key={index}>
                                            <li className={"header-nav__item " + (link.current === true ? "header-nav__item--active" : "")}
                                                onClick={() => this.changePage(link.label)}>
                                                <a href={link.link}
                                                   className="header-nav__link">{link.label}
                                                </a>
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
        );
    }
}
