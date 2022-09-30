const handleStorage = (chave, value = false) => {
  if (value) {
    localStorage.setItem(chave, JSON.stringify(value));
  } else {
    return JSON.parse(localStorage.getItem(chave));
  }
};

export default handleStorage;
