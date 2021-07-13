import React from 'react';
import Categories from './Categories';
import { getReviews } from '../utils/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Error from './Error';

const Reviews = ({
  category,
  setCategory,
  reviews,
  setReviews,
  errorMessage,
  setErrorMessage
}) => {
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortByComments, setSortByComments] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getReviews(sortCriteria)
      .then((response) => {
        setReviews(
          response.map((review) => {
            return review;
          })
        );
        setIsReviewsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.msg);
        setIsError(true);
      });
  }, [sortCriteria, setReviews, setErrorMessage]);

  let filteredReviews = reviews;

  if (category !== '') {
    filteredReviews = filteredReviews.filter((review) => {
      return review.category === category;
    });
  }

  if (sortByComments) {
    filteredReviews.sort((a, b) => {
      return b.comment_count - a.comment_count;
    });
  }

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
        <Categories
          setCategory={setCategory}
          setSortCriteria={setSortCriteria}
          setSortByComments={setSortByComments}
        />
        <ul className="reviews">
          {filteredReviews.map((review) => {
            return (
              <li key={review.review_id}>
                <div className="review">
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
                  <p>Created: {review.created_at}</p>
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

export default Reviews;
