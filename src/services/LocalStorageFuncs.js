export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getIem = (key) => key && JSON.parse(localStorage.getItem(key));
