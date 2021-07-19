import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ signedInUser }) => {
  return (
    <div>
      <Link to="/">
        <h1>GAME REVIEWS</h1>
      </Link>
      {signedInUser ? (
        <span className="user">Signed in as {signedInUser}</span>
      ) : (
        <p className="users">Please sign in --- ⟱</p>
      )}
    </div>
  );
};

export default Header;
