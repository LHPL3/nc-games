import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://lh-game-review.herokuapp.com/api'
});

export const getReviews = async (sortCriteria) => {
  if (sortCriteria !== '') {
    const { data } = await baseApi.get('/reviews', {
      params: { sort_by: sortCriteria }
    });
    return data.reviews;
  } else {
    const { data } = await baseApi.get('/reviews');
    return data.reviews;
  }
};

export const getReviewsByCategory = async (category, sortCriteria) => {
  if (sortCriteria !== '') {
    const { data } = await baseApi.get('/reviews', {
      params: { category: category, sort_by: sortCriteria }
    });
    return data.reviews;
  } else {
    const { data } = await baseApi.get('/reviews', {
      params: { category: category }
    });
    return data.reviews;
  }
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

export const getUsers = async () => {
  const { data } = await baseApi.get('/users');
  return data.users;
};

export const getUser = async (username) => {
  const { data } = await baseApi.get(`users/${username}`);
  return data.user;
};

export const addComment = async (review_id, username, body) => {
  if (body.length !== 0 && username !== '') {
    const { data } = await baseApi.post(`reviews/${review_id}/comments`, {
      username: username,
      body: body
    });
    return data.comment;
  }
};

export const deleteComment = async (comment_id) => {
  const { data } = await baseApi.delete(`comments/${comment_id}`);
  return data;
};
