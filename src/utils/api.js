import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://lh-game-review.herokuapp.com/api'
});

export const getReviews = async () => {
  const { data } = await baseApi.get('/reviews');
  return data.reviews;
};

export const getReviewById = async (review_id) => {
  const { data } = await baseApi.get(`/reviews/${review_id}`);
  return data.review;
};

export const getCommentsById = async (review_id) => {
  const { data } = await baseApi.get(`/reviews/${review_id}/comments`);
  return data.comments;
};

export const getCategories = async () => {
  const { data } = await baseApi.get('/categories');
  return data.categories;
};

export const addVotesToReview = async (review_id) => {
  const { data } = await baseApi.patch(`reviews/${review_id}`, {
    inc_votes: 1
  });
  return data.reviews;
};

export const addVotesToComment = async (comment_id) => {
  const { data } = await baseApi.patch(`comments/${comment_id}`, {
    inc_votes: 1
  });
  return data.updated;
};
