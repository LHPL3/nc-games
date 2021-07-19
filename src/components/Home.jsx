import React, { useEffect } from 'react';
import { getReviews } from '../utils/api';
import { useState } from 'react';
import Loading from './Loading';
import { amendDate } from '../utils/utils';
import { Link } from 'react-router-dom';
import Error from './Error';

const Home = () => {
  const [homeIsLoading, setHomeIsLoading] = useState(true);
  const [topReview, setTopReview] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getReviews()
      .then((response) => {
        const reviews = response.sort((a, b) => {
          return b.votes - a.votes;
        });
        setTopReview(reviews[0]);
        setHomeIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response);
        setIsError(true);
      });
  }, []);

  if (isError) {
    return (
      <div>
        <Error errorMessage={errorMessage} />
      </div>
    );
  }

  if (!homeIsLoading) {
    return (
      <div className="home-container">
        <h2 className="reviewtitle">Top Rated Review:</h2>
        <Link to={`/reviews/${topReview.review_id}`}>
          <p className="home-title">{topReview.title}</p>
        </Link>
        <img
          className="topimage"
          src={topReview.review_img_url}
          alt={topReview.title}
        ></img>
        <p className="post-details">
          By {topReview.owner} - Created: {amendDate(topReview.created_at)}
        </p>
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

export default Home;
