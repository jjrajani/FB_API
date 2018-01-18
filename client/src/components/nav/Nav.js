import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <Link to={`/`}>Home</Link> {' | '}
      <Link to={`/businesses`}>Businesses</Link> {' | '}
      <Link to={`/pages`}>Pages</Link>
    </div>
  );
};

export default Nav;
