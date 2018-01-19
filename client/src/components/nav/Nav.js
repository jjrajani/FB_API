import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="nav">
      <NavLink exact className="nav-link" activeClassName="active" to={`/`}>
        Home
      </NavLink>
      <NavLink
        exact
        className="nav-link"
        activeClassName="active"
        to={`/businesses`}
      >
        Businesses
      </NavLink>
      <NavLink
        exact
        className="nav-link"
        activeClassName="active"
        to={`/ad_accounts`}
      >
        Ad Accounts
      </NavLink>
      <NavLink
        exact
        className="nav-link"
        activeClassName="active"
        to={`/pages`}
      >
        Pages
      </NavLink>
    </div>
  );
};

export default Nav;
