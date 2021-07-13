import React, { useEffect, useState } from 'react';
import { addVotesToReview, getReviewById } from '../utils/api';
import Comments from './Comments';
import { useParams } from 'react-router';
import Error from './Error';

const Review = ({ signedInUser, errorMessage, setErrorMessage }) => {
  const [review, setReview] = useState('');
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { review_id } = useParams();

  const getReview = () => {
    getReviewById(review_id)
      .then((response) => {
        setReview(response);
        setIsReviewLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.msg);
        setIsError(true);
      });
  };

  useEffect(() => {
    getReviewById(review_id)
      .then((response) => {
        setReview(response);
        setIsReviewLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.msg);
        setIsError(true);
      });
  }, [review_id, setErrorMessage]);

  if (isError) {
    return (
      <div>
        <Error errorMessage={errorMessage} />
      </div>
    );
  }
  if (!isReviewLoading) {
    return (
      <div>
        <h3 className="reviewtitle">{review.title}</h3>
        <p className="designer">Game Designer: {review.designer}</p>
        <img
          className="image"
          src={review.review_img_url}
          alt={review.title}
        ></img>
        <p className="reviewbody">{review.review_body}</p>
        <p>
          by {review.owner} - posted on {review.created_at.slice(0, 10)}
        </p>
        <p>
          Votes: {review.votes}
          <button
            onClick={(event) => {
              event.preventDefault();
              addVotesToReview(review_id).then((response) => {
                getReview();
              });
            }}
          >
            +1
          </button>
        </p>
        <Comments signedInUser={signedInUser} />
      </div>
    );
  } else {
    return <div>...Loading</div>;
  }
};

export default Review;
