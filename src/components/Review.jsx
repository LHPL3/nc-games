import React, { useEffect, useState } from 'react';
import { addVotesToReview, getReviewById } from '../utils/api';
import Comments from './Comments';
import { useParams } from 'react-router';

const Review = () => {
  const [review, setReview] = useState('');
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [update, setUpdate] = useState('');
  const { review_id } = useParams();

  useEffect(() => {
    getReviewById(review_id).then((response) => {
      setReview(response);
      setIsReviewLoading(false);
    });
  }, [update]);

  if (!isReviewLoading) {
    return (
      <div>
        <h3>{review.title}</h3>
        <p>Game Designer: {review.designer}</p>
        <img className="image" src={review.review_img_url}></img>
        <p>{review.review_body}</p>
        <p>
          by {review.owner} // posted on {review.created_at.slice(0, 10)}
        </p>
        <p>
          Votes: {review.votes}
          <button
            onClick={(event) => {
              event.preventDefault();
              addVotesToReview(review_id).then((response) => {
                setUpdate(update + 1);
              });
            }}
          >
            +1
          </button>
        </p>
        <Comments />
      </div>
    );
  } else {
    return <div>...Loading</div>;
  }
};

export default Review;
