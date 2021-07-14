import React from 'react';
import { useEffect, useState } from 'react';
import { getUsers } from '../utils/api';
import { Link } from 'react-router-dom';
import Loading from './Loading';

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
      <div className="userscontainer">
        <ul className="users">
          {users.map((user) => {
            return (
              <li className="userlist" key={user.username}>
                <Link to={`/users/${user.username}`}>
                  <button className="userbutton">{user.username}</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <Loading />
      </div>
    );
  }
};

export default Users;
