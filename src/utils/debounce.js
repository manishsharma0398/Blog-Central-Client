export const debounce = function (cb, waitTime) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
      timer = null;
    }, waitTime);
  };
};
