import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
// import './VerticalNav.css';

interface Props{
  links: Link[]
}

interface Link{
  link: string,
  label: string, 
  current? : boolean
}

interface State{
  links: Link[]
}

export class HeaderNav extends Component <Props, State>{
  displayName = HeaderNav.name;

  constructor(props : Props) {
    super(props);
    this.state = { links: props.links}
  }

    changePage = (label: string) => {
        let links = this.state.links;
        let link = links.find(x => x.current);
        link !== undefined ? link.current = false : console.log("there is no current!");
        link = links.find(x => x.label === label);
        link !== undefined ? link.current = true : console.log("somehow it's undefined!");
        this.setState({links: links});
    };

    render() {
    return (
        <div className="container container--gutterless@xs@m col-8">
            <nav className="header-nav js-header-nav" id="main-nav" aria-label="Main menu" data-ga-element="navigation">
                <ul className="header-nav__list" aria-label="" role="menubar">
                    {this.state.links.map((link, index) =>
                        <LinkContainer key={index} to={link.link}>                  
                            <li className={"header-nav__item " + (link.current === true ? "header-nav__item--active": "")} onClick={() => this.changePage(link.label)}><a className="header-nav__link">{link.label}</a></li>
                        </LinkContainer>
                    )}
                </ul>
            </nav>
        </div>
    );
  }
}
