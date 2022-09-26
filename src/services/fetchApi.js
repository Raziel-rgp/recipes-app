const fetchApi = async (value, type) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${value}`;
  console.log(url);
  const data = fetch(url).then((response) => response.json());
  return data;
};

export default fetchApi;
