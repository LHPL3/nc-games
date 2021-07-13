import React from 'react';
import { useEffect, useState } from 'react';
import { getUsers } from '../utils/api';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState('');
  const [isUsersLoading, setIsUsersLoading] = useState(true);

  useEffect(() => {
    getUsers().then((response) => {
      setUsers(response);
      setIsUsersLoading(false);
    });
  }, []);

  if (!isUsersLoading) {
    return (
      <div>
        <ul className="users">
          {users.map((user) => {
            return (
              <li key={user.username}>
                <Link to={`/users/${user.username}`}>
                  <h3>{user.username}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <div>...Loading</div>;
  }
};

export default Users;
