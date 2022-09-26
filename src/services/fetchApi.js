const fetchApi = async (type, value) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?${type}${value}`;

  const data = fetch(url).then((response) => response.json());
  return data;
};
