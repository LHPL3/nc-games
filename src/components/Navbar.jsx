import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <Link to="/reviews">
        <button>Reviews</button>
      </Link>
      <Link to="/users">
        <button>Users</button>
      </Link>
    </div>
  );
};

export default Navbar;
