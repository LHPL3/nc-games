import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navarea">
      <span className="navbar">
        <Link to="/reviews">
          <button className="menubutton">
            <span>Reviews</span>
          </button>
        </Link>
        <Link to="/users">
          <button className="menubutton">
            <span>Users</span>
          </button>
        </Link>
      </span>
    </div>
  );
};

export default Navbar;
