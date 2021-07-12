import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { addVotesToComment, getCommentsById } from '../utils/api';

const Comments = () => {
  const { review_id } = useParams();
  const [comments, setComments] = useState('');
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [update, setUpdate] = useState('');

  useEffect(() => {
    getCommentsById(review_id).then((response) => {
      setComments(response);
      setIsCommentsLoading(false);
    });
  }, [update]);

  if (!isCommentsLoading) {
    if (comments.length === 0) {
      return <div>No Comments</div>;
    } else {
      return (
        <div>
          <h4>Comments:</h4>
          <ul className="comments">
            {comments.map((comment) => {
              return (
                <li key={comment.comment_id}>
                  <div className="comment">
                    <p>
                      {comment.body} - By {comment.author} on{' '}
                      {comment.created_at.slice(0, 10)}// {comment.votes} Votes
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          addVotesToComment(comment.comment_id).then(
                            (response) => {
                              setUpdate(update + 1);
                            }
                          );
                        }}
                      >
                        +1
                      </button>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  } else {
    return <div>Loading...</div>;
  }
};
export default Comments;
