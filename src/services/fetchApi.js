const fetchApi = async (url) => fetch(url).then((response) => response.json());

export default fetchApi;
