export const amendDate = (date) => {
  const newDate = new Date(date);
  return newDate.toString().slice(0, 24);
};
