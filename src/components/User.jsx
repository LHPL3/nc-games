import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews, getUser } from '../utils/api';
import { Link } from 'react-router-dom';
import Error from './Error';

const User = ({ setSignedInUser, errorMessage, setErrorMessage }) => {
  const [user, setUser] = useState('');
  const [userReview, setUserReview] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    Promise.all([getUser(username), getReviews()])
      .then((values) => {
        setUser(values[0]);
        setUserReview(values[1]);
      })
      .then(setIsUserLoading(false))
      .catch((err) => {
        setErrorMessage(err.response.data.msg);
        setIsError(true);
      });
  }, [username, setErrorMessage]);

  if (isError) {
    return (
      <div>
        <Error errorMessage={errorMessage} />
      </div>
    );
  }

  if (!isUserLoading) {
    let filteredReviews = userReview.filter((review) => {
      return review.owner === username;
    });

    return (
      <div className="container">
        <h3>Welcome to {user.name}'s page</h3>
        <p>
          Username: {user.username}
          <button
            onClick={(event) => {
              event.preventDefault();
              setSignedInUser(user.username);
            }}
          >
            Login
          </button>
        </p>
        <img src={user.avatar_url} alt={user.username}></img>
        <ul>
          {filteredReviews.map((review) => {
            return (
              <li key={review.review_id}>
                <div className="userreview">
                  <Link to={`/reviews/${review.review_id}`}>
                    <h3>{review.title}</h3>
                  </Link>
                  <img
                    className="reviewimage"
                    alt={review.title}
                    src={review.review_img_url}
                  ></img>
                  <p>
                    Votes: {review.votes} - Comments: {review.comment_count}
                  </p>
                </div>
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

export default User;
