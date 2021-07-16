import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getReviewsByCategory } from '../utils/api';
import { amendDate } from '../utils/utils';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Categories from './Categories';
import Error from './Error';

const Category = () => {
  const { category } = useParams();
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getReviewsByCategory("'" + category + "'", sortCriteria)
      .then((response) => {
        setFilteredReviews(response);
        setIsReviewsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response);
        setIsError(true);
      });
  }, [category, sortCriteria]);

  if (isError) {
    return (
      <div>
        <Error errorMessage={errorMessage} />
      </div>
    );
  }

  if (!isReviewsLoading) {
    return (
      <section className="container">
        <Categories setSortCriteria={setSortCriteria} />
        {category}-{sortCriteria}
        <ul className="reviews">
          {filteredReviews.map((review) => {
            return (
              <li key={review.review_id}>
                <div className="review">
                  <Link to={`/reviews/${review.review_id}`}>
                    <h3 className="toptext">{review.title}</h3>
                  </Link>
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
              </li>
            );
          })}
        </ul>
      </section>
    );
  } else {
    return (
      <div>
        <Loading />;
      </div>
    );
  }
};
export default Category;
