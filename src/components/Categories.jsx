import React from 'react';
import { getCategories } from '../utils/api';
import { useState, useEffect } from 'react';
import Loading from './Loading';

const Categories = ({ setCategory, setSortCriteria, setSortByComments }) => {
  const [categories, setCategories] = useState('');
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  const resetClick = () => {
    setCategory('');
    setSortCriteria('');
    setSortByComments(false);
  };

  useEffect(() => {
    getCategories()
      .then((response) => {
        const cats = response.map((category) => {
          return category.slug;
        });
        setCategories(cats);
      })
      .then((response) => {
        setIsCategoriesLoading(false);
      });
  }, []);

  if (!isCategoriesLoading) {
    return (
      <div>
        {categories.map((category) => {
          return (
            <button
              className="categorybutton"
              key={category}
              onClick={(event) => {
                event.preventDefault();
                setCategory(category);
              }}
            >
              {(category.charAt(0).toUpperCase() + category.slice(1)).replace(
                /-/g,
                ' '
              )}
            </button>
          );
        })}
        <br />
        <button
          className="resetbutton"
          onClick={(event) => {
            event.preventDefault();
            resetClick();
          }}
        >
          Reset
        </button>
        <br />
        <button
          className="sortbutton"
          onClick={(event) => {
            event.preventDefault();
            setSortByComments(false);
            setSortCriteria('created_at');
          }}
        >
          Date
        </button>
        <button
          className="sortbutton"
          onClick={(event) => {
            event.preventDefault();
            setSortCriteria('');
            setSortByComments(true);
          }}
        >
          Comments
        </button>
        <button
          className="sortbutton"
          onClick={(event) => {
            event.preventDefault();
            setSortByComments(false);
            setSortCriteria('votes');
          }}
        >
          Votes
        </button>
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
