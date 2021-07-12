import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Link to="/">
        <h1>GIOMES</h1>
      </Link>
    </div>
  );
};

export default Header;
