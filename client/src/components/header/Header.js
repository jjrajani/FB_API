import React from 'react';
import { Login } from '../';
import Logo from '../../assets/FF_Avatar.png';

const Header = () => (
  <div className="header">
    <img src={Logo} alt="FlowFound Logo" />
    <Login />
  </div>
);

export default Header;
