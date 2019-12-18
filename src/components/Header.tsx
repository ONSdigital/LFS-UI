import React, {Component} from "react";

interface Props {
    title: string,
    loggedIn: boolean
}

export class Header extends Component <Props,{}>{
  displayName = Header.name;

    render() {
    return (
        <header className="header header--internal header--thin">
            <div className="header__top" role="banner">
                <div className="container col-8">
                <div className="header__grid-top grid grid--gutterless grid--flex grid--between grid--vertical-center grid--no-wrap">
                    <div className="grid__col col-auto">
                        <a href={"/"}>
                            <img className="header__logo" src={"/img/ons-logo-white.svg"} alt="Office for National Statistics logo"/>
                        </a>
                    </div>
                    <div className="header__links grid__col col-auto">
                    <div className="grid__col col-auto u-d-no@xs@m">
                        {/* TODO: Unused Navigation in the header, May use at some point */}
                        {/*<nav className="header-service-nav header-service-nav--internal" aria-label="Site services menu">*/}
                        {/*<ul className="header-service-nav__list" aria-label="Navigation menu">*/}
                        {/*    <li className="header-service-nav__item">*/}
                        {/*        <a href="/" className="header-service-nav__link">User Management</a>*/}
                        {/*    </li>*/}
                        {/*    <li className="header-service-nav__item">*/}
                        {/*    <a href="#" className="header-service-nav__link"/>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}
                        {/*</nav>*/}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="header__main">
                <div className="container col-8">
                    <div className="grid grid--gutterless grid--flex grid--between grid--vertical-center grid--no-wrap">
                        <div className="grid__col col-auto u-flex-shrink">
                            <div className="header__title">{this.props.title}</div>
                            </div>
                            <div className="grid__col col-auto u-flex-no-shrink">
                                {this.props.loggedIn ?
                                    <a href={"/logout"} role="button" className="btn btn--ghost u-d-no@xs@m">
                                        <span className="btn__inner">Sign Out</span>
                                    </a>
                                    :
                                    <div/>
                                }
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__bottom">
                {this.props.children}
            </div>
        </header>
    );
  }
}
