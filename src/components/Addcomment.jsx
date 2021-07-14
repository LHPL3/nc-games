import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { addComment } from '../utils/api';

const Addcomment = ({ signedInUser, getComments, setIsCommentsLoading }) => {
  const { review_id } = useParams();
  const [newComment, setNewComment] = useState('');

  const addClick = () => {
    addComment(review_id, signedInUser, newComment)
      .then((response) => {
        getComments();
      })
      .then((response) => {
        setIsCommentsLoading(true);
      });
  };

  return (
    <div className="commentbox">
      <span>
        <label htmlFor="comment">Add Comment:</label>
        <input
          id="comment"
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
        ></input>
        {signedInUser ? (
          <button
            onClick={(event) => {
              event.preventDefault();
              addClick();
            }}
          >
            Submit!
          </button>
        ) : (
          <p>Sign in to comment!</p>
        )}
      </span>
    </div>
  );
};

export default Addcomment;
