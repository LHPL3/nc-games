import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  addVotesToComment,
  deleteComment,
  getCommentsById
} from '../utils/api';
import { amendDate } from '../utils/utils';
import AddComment from './AddComment';
import Loading from './Loading';
import Error from './Error';

const Comments = ({ signedInUser }) => {
  const { review_id } = useParams();
  const [comments, setComments] = useState('');
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const getComments = () => {
    getCommentsById(review_id)
      .then((response) => {
        setComments(response);
      })
      .then((response) => {
        setIsCommentsLoading(false);
      });
  };

  useEffect(() => {
    getCommentsById(review_id)
      .then((response) => {
        setComments(response);
        setIsCommentsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response);
        setIsError(true);
      });
  }, [review_id]);

  if (isError) {
    return (
      <div>
        <Error errorMessage={errorMessage} />
      </div>
    );
  }

  if (!isCommentsLoading) {
    comments.sort((a, b) => {
      return b.comment_id - a.comment_id;
    });

    if (comments.length === 0) {
      return (
        <div>
          <p>No Comments</p>
          <AddComment
            signedInUser={signedInUser}
            getComments={getComments}
            setIsCommentsLoading={setIsCommentsLoading}
          />
        </div>
      );
    } else {
      return (
        <div>
          <h2>Comments:</h2>
          <ul className="comments">
            {comments.map((comment) => {
              return (
                <li key={comment.comment_id}>
                  <div className="comment">
                    <p className="commentbody">{comment.body}</p>{' '}
                    {signedInUser === comment.author ? (
                      <button
                        className="deletebutton"
                        onClick={(event) => {
                          event.preventDefault();
                          deleteComment(comment.comment_id).then((response) => {
                            getComments();
                          });
                        }}
                      >
                        X
                      </button>
                    ) : null}
                    <br />
                    <p className="post-details">
                      By {comment.author} on {amendDate(comment.created_at)}{' '}
                    </p>{' '}
                    <br />
                    {comment.votes} Votes
                    <button
                      className="plusbutton"
                      onClick={(event) => {
                        event.preventDefault();
                        addVotesToComment(comment.comment_id).then(
                          (response) => {
                            getComments();
                          }
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <AddComment
            signedInUser={signedInUser}
            getComments={getComments}
            setIsCommentsLoading={setIsCommentsLoading}
          />
        </div>
      );
    }
  } else {
    return (
      <div>
        <Loading />
      </div>
    );
  }
};
export default Comments;
