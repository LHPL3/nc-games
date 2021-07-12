import React from 'react';
import { getCategories } from '../utils/api';
import { useState, useEffect } from 'react';

const Categories = ({ category, setCategory }) => {
  const [categories, setCategories] = useState('');
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  useEffect(() => {
    getCategories().then((response) => {
      setCategories(
        response.map((category) => {
          return category.slug;
        })
      );
      setIsCategoriesLoading(false);
    });
  }, []);

  if (!isCategoriesLoading) {
    return (
      <div>
        {categories.map((category) => {
          return (
            <button
              key={category}
              onClick={(event) => {
                event.preventDefault();
                setCategory(category);
              }}
            >
              {category}
            </button>
          );
        })}
        -
        <button
          onClick={(event) => {
            event.preventDefault();
            setCategory('');
          }}
        >
          Reset
        </button>
      </div>
    );
  } else {
    return <div>...Loading</div>;
  }
};

export default Categories;
