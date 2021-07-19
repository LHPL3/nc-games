import React from 'react';
import Categories from './Categories';
import { getReviews } from '../utils/api';
import { amendDate } from '../utils/utils';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Error from './Error';
import Loading from './Loading';

const Reviews = () => {
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [reviews, setReviews] = useState('');

  useEffect(() => {
    getReviews(sortCriteria)
      .then((response) => {
        setReviews(response);
        setIsReviewsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response);
        setIsError(true);
      });
  }, [sortCriteria, setReviews, setErrorMessage]);

  let filteredReviews = reviews;

  if (isError) {
    return (
      <div>
        <Error errorMessage={errorMessage} />
      </div>
    );
  }

  if (!isReviewsLoading) {
    return (
      <div className="container">
        <Categories setSortCriteria={setSortCriteria} />
        {sortCriteria ? `Sorted by: ${sortCriteria}` : null}
        <ul className="reviews">
          {filteredReviews.map((review) => {
            return (
              <li key={review.review_id}>
                <Link to={`/reviews/${review.review_id}`}>
                  <div className="review">
                    <h3 className="toptext">{review.title}</h3>
                    <img
                      className="reviewimage"
                      alt={review.title}
                      src={review.review_img_url}
                    ></img>
                    <p className="bottomtext">
                      Votes: {review.votes} - Category:{' '}
                      {(
                        review.category.charAt(0).toUpperCase() +
                        review.category.slice(1)
                      ).replace(/-/g, ' ')}
                      <br />
                      Created: {amendDate(review.created_at)}
                    </p>
                  </div>
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

export default Reviews;
