import React from 'react';
import Categories from './Categories';
import { getReviews } from '../utils/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Reviews = ({ category, setCategory, reviews, setReviews }) => {
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);

  useEffect(() => {
    getReviews().then((response) => {
      setReviews(
        response.map((review) => {
          return review;
        })
      );
      setIsReviewsLoading(false);
    });
  }, []);

  let filteredReviews = reviews;

  if (category !== '') {
    filteredReviews = filteredReviews.filter((review) => {
      return review.category === category;
    });
  }

  if (!isReviewsLoading) {
    return (
      <div>
        <Categories category={category} setCategory={setCategory} />
        <ul className="reviews">
          {filteredReviews.map((review) => {
            return (
              <li key={review.review_id}>
                <div className="review">
                  <Link to={`/reviews/${review.review_id}`}>
                    <h2>{review.title}</h2>
                  </Link>
                  <img
                    className="image"
                    alt={review.title}
                    src={review.review_img_url}
                  ></img>
                  <p>
                    Votes: {review.votes} // Comments: {review.comment_count}
                  </p>
                  <p></p>
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
