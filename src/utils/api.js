import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://lh-game-review.herokuapp.com/api'
});

export const getReviews = async () => {
  const { data } = await baseApi.get('/reviews');
  return data.reviews;
};
