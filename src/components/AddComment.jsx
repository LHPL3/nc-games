import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { addComment } from '../utils/api';
import { Link } from 'react-router-dom';

const AddComment = ({ signedInUser, getComments, setIsCommentsLoading }) => {
  const { review_id } = useParams();
  const [newComment, setNewComment] = useState('');

  const addClick = () => {
    addComment(review_id, signedInUser, newComment).then((response) => {
      getComments();
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
        {signedInUser && newComment ? (
          <button
            onClick={(event) => {
              event.preventDefault();
              addClick();
            }}
          >
            Submit!
          </button>
        ) : !signedInUser ? (
          <Link to="/users">
            <p>Sign in to comment!</p>
          </Link>
        ) : (
          <p> Please enter a comment!</p>
        )}
      </span>
    </div>
  );
};

export default AddComment;
