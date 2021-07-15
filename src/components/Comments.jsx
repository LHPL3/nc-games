import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  addVotesToComment,
  deleteComment,
  getCommentsById
} from '../utils/api';
import { amendDate } from '../utils/utils';
import Addcomment from './Addcomment';
import Loading from './Loading';

const Comments = ({ signedInUser }) => {
  const { review_id } = useParams();
  const [comments, setComments] = useState('');
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

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
      })
      .then((response) => {
        setIsCommentsLoading(false);
      });
  }, [review_id]);

  if (!isCommentsLoading) {
    comments.sort((a, b) => {
      return b.comment_id - a.comment_id;
    });

    if (comments.length === 0) {
      return (
        <div>
          <p>No Comments</p>
          <Addcomment
            signedInUser={signedInUser}
            getComments={getComments}
            setIsCommentsLoading={setIsCommentsLoading}
          />
        </div>
      );
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
                      {comment.body}{' '}
                      {signedInUser === comment.author ? (
                        <button
                          className="deletebutton"
                          onClick={(event) => {
                            event.preventDefault();
                            deleteComment(comment.comment_id).then(
                              (response) => {
                                getComments();
                              }
                            );
                          }}
                        >
                          X
                        </button>
                      ) : null}
                      <br />- By {comment.author} on{' '}
                      {amendDate(comment.created_at)} <br />
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
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <Addcomment
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
