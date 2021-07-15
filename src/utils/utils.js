export const amendDate = (date) => {
  let newDate = new Date(date);
  newDate = newDate.toString().slice(0, 24).split(' ');
  newDate.splice(0, 1);
  newDate.unshift(newDate.splice(1, 1)[0]);
  return newDate.join(' ');
};
