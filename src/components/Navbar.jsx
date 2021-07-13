import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ signedInUser }) => {
  if (signedInUser !== '') {
    return (
      <div>
        <Link to="/reviews">
          <button>Reviews</button>
        </Link>
        <Link to="/users">
          <button>Users</button>
        </Link>
        <p className="user">Signed in as {signedInUser}</p>
      </div>
    );
  } else {
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
  }
};

export default Navbar;
