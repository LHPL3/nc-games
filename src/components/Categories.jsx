import React from 'react';
import { getCategories } from '../utils/api';
import { useState, useEffect } from 'react';
import Loading from './Loading';

const Categories = ({ setCategory, setSortCriteria, setSortByComments }) => {
  const [categories, setCategories] = useState('');
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const resetClick = () => {
    setCategory('');
    setSortCriteria('');
    setSortByComments(false);
    setShowSort(false);
    setShowMenu(false);
  };

  const displayMenu = () => {
    setShowMenu(true);
  };

  const displaySort = () => {
    setShowSort(true);
  };

  const hideSort = (sort) => {
    setSortCriteria(sort);
    setShowSort(false);
  };

  const hideMenu = (category) => {
    setCategory(category);
    setShowMenu(false);
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
        <button
          className="categories-menu"
          onClick={(event) => {
            event.preventDefault();
            displayMenu();
          }}
        >
          Categories
        </button>
        <button
          className="sort-menu"
          onClick={(event) => {
            event.preventDefault();
            displaySort();
          }}
        >
          Sort-by
        </button>

        {showMenu ? (
          <div className="dropdown-menu">
            {categories.map((category) => {
              return (
                <button
                  id="dropdown-item"
                  className="categorybutton"
                  key={category}
                  onClick={(event) => {
                    event.preventDefault();
                    hideMenu(category);
                  }}
                >
                  {(
                    category.charAt(0).toUpperCase() + category.slice(1)
                  ).replace(/-/g, ' ')}
                </button>
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
                hideSort('created_at');
                setSortByComments(false);
              }}
            >
              Date
            </button>
            <button
              className="sortbutton"
              onClick={(event) => {
                event.preventDefault();
                setSortByComments(true);
                hideSort('');
              }}
            >
              Comments
            </button>
            <button
              className="sortbutton"
              onClick={(event) => {
                event.preventDefault();
                setSortByComments(false);
                hideSort('votes');
              }}
            >
              Votes
            </button>
          </div>
        ) : null}
        <button
          className="resetbutton"
          onClick={(event) => {
            event.preventDefault();
            resetClick();
          }}
        >
          Reset
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
