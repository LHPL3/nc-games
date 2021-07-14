import React, { useEffect } from 'react';
import { getReviews } from '../utils/api';
import { useState } from 'react';
import Loading from './Loading';
import { amendDate } from '../utils/utils';
import { Link } from 'react-router-dom';

const Home = () => {
  const [homeIsLoading, setHomeIsLoading] = useState(true);
  const [topReview, setTopReview] = useState([]);

  useEffect(() => {
    getReviews()
      .then((response) => {
        const reviews = response.sort((a, b) => {
          return b.votes - a.votes;
        });
        setTopReview(reviews[0]);
      })
      .then((response) => {
        setHomeIsLoading(false);
      });
  }, []);

  console.log(topReview);

  if (!homeIsLoading) {
    return (
      <div className="homecontainer">
        <h3 className="reviewtitle">Top Rated Review:</h3>
        <Link to={`/reviews/${topReview.review_id}`}>
          <p className="designer">{topReview.title}</p>
        </Link>
        <img
          className="topimage"
          src={topReview.review_img_url}
          alt={topReview.title}
        ></img>
        <p>
          by {topReview.owner} - posted on {amendDate(topReview.created_at)}
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
