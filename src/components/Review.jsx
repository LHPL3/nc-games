import React, { useEffect, useState } from 'react';
import { addVotesToReview, getReviewById } from '../utils/api';
import { amendDate } from '../utils/utils';
import Comments from './Comments';
import { useParams } from 'react-router';
import Error from './Error';
import Loading from './Loading';

const Review = ({ signedInUser }) => {
  const [review, setReview] = useState('');
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { review_id } = useParams();

  const getReview = () => {
    getReviewById(review_id)
      .then((response) => {
        setReview(response);
        setIsReviewLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response);
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
        setErrorMessage(err.response);
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
      <div className="reviewarea">
        <div className="border">
          <h3 className="reviewtitle">{review.title}</h3>
          <p className="designer">Game Designer: {review.designer}</p>
          <span className="columns">
            <p className="reviewbody">{review.review_body}</p>
            <img
              className="image"
              src={review.review_img_url}
              alt={review.title}
            ></img>
          </span>
          <p className="post-details">
            By {review.owner} - posted on {amendDate(review.created_at)}
          </p>
          <p>
            Votes: {review.votes}
            <button
              className="plusbutton"
              onClick={(event) => {
                event.preventDefault();
                addVotesToReview(review_id).then((response) => {
                  getReview();
                });
              }}
            >
              +
            </button>
          </p>
          <Comments signedInUser={signedInUser} />
        </div>
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

export default Review;
