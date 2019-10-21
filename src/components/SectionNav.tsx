import React, { Component } from 'react';
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

export class SectionNav extends Component <Props, State>{
  displayName = SectionNav.name;

  constructor(props : Props) {
    super(props);
    this.state = { links: props.links}
  }

    changePage = (label: string) => {
        let links = this.state.links;
        let link = links.find(x => x.current);
        link != undefined ? link.current = false : console.log("there is no current!");
        link = links.find(x => x.label === label);
        link != undefined ? link.current = true : console.log("somehow it's undefined!");
        this.setState({links: links});
    };

    render() {
    return (
      <div className="container container--full-width">
        <nav className="section-nav" id="" aria-label="Section menu">
          <ul className="section-nav__list" aria-label="">
            {this.state.links.map((link, index) =>
                <li className="section-nav__item " onClick={() => this.changePage(link.label)}><a href={link.link} className="section-nav__link">{link.label}</a></li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}
