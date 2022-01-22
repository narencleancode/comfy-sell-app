import React from 'react';
import {Nav, NavItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';

const tabs = [{
    route: "/search",
    label: "Search"
}, {
    route: "/listings",
    label: "My Listings"
}]

const Navigation = () => {
    return (
        <div>
            <nav className="navbar fixed-bottom navbar-light bottom-tab-nav" role="navigation">
                <Nav className="w-100">
                    <div className=" d-flex flex-row justify-content-around w-100">
                        {
                            tabs.map((tab, index) => (
                                <NavItem key={`tab-${index}`}>
                                    <NavLink to={tab.route} className="nav-link bottom-nav-link" >
                                        <div
                                            className="row d-flex flex-column justify-content-center align-items-center">
                                            <div className="bottom-tab-label">{tab.label}</div>
                                        </div>
                                    </NavLink>
                                </NavItem>
                            ))
                        }
                    </div>
                </Nav>
            </nav>
        </div>
    )
}

export default Navigation;
