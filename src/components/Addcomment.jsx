import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { addComment } from '../utils/api';

const Addcomment = ({ signedInUser, getComments, setIsCommentsLoading }) => {
  const { review_id } = useParams();
  const [newComment, setNewComment] = useState('');

  return (
    <div>
      <span className="commentbox">
        <label htmlFor="comment">Add Comment:</label>
        <input
          id="comment"
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
        ></input>
        <button
          onClick={(event) => {
            event.preventDefault();
            addComment(review_id, signedInUser, newComment).then((response) => {
              getComments();
              setIsCommentsLoading(true);
            });
          }}
        >
          Submit!
        </button>
      </span>
    </div>
  );
};

export default Addcomment;
