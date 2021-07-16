import React from 'react';
import { getCategories } from '../utils/api';
import { useState, useEffect } from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import Error from './Error';

const Categories = ({ setSortCriteria }) => {
  const [categories, setCategories] = useState('');
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response);
        setIsCategoriesLoading(false);
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

  if (!isCategoriesLoading) {
    return (
      <div className="category-bar">
        <span className="filter-button">
          <button
            className="menu"
            onClick={(event) => {
              event.preventDefault();
              setShowCategories(() => {
                return !showCategories;
              });
            }}
          >
            Categories
          </button>
          <button
            className="menu"
            onClick={(event) => {
              event.preventDefault();
              setShowSort(() => {
                return !showSort;
              });
            }}
          >
            Sort-by
          </button>
        </span>
        {showCategories ? (
          <div className="dropdown-menu">
            {categories.map(({ slug }) => {
              return (
                <Link to={`/category/${slug}`}>
                  <button
                    id="dropdown-item"
                    className="categorybutton"
                    key={slug}
                  >
                    {(slug.charAt(0).toUpperCase() + slug.slice(1)).replace(
                      /-/g,
                      ' '
                    )}
                  </button>
                </Link>
              );
            })}
          </div>
        ) : null}
        {showSort ? (
          <div className="dropdown-menu">
            <button
              className="sortbutton"
              onClick={(event) => {
                event.preventDefault();
                setSortCriteria('created_at');
              }}
            >
              Date
            </button>

            <button
              className="sortbutton"
              onClick={(event) => {
                event.preventDefault();
                setSortCriteria('votes');
              }}
            >
              Votes
            </button>
          </div>
        ) : null}
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

export default Categories;
