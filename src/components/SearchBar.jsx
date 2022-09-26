import React, { useState, useContext } from 'react';
import FoodsContext from '../provider/FoodsContext';

const getUrl = (typeSearch, typeValue, value) => `https://www.themealdb.com/api/json/v1/1/${typeSearch}.php?${typeValue}=${value}`;

function SearchBar() {
  const [filterSearch, setFilterSearch] = useState({
    value: '',
    filter: '',
  });
  const { getFoods } = useContext(FoodsContext);

  const handleChange = ({ target: { name, value } }) => {
    setFilterSearch({
      ...filterSearch,
      [name]: value,
    });
  };

  const getFirstLetter = (value) => {
    if (value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getFoods(getUrl('search', 'f', filterSearch.value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    switch (filterSearch.filter) {
    case 'Ingredient':
      getFoods(getUrl('filter', 'i', filterSearch.value));
      break;
    case 'Name':
      getFoods(getUrl('search', 's', filterSearch.value));
      break;
    case 'First letter':
      getFirstLetter(filterSearch.value);
      break;
    default: break;
    }
  };

  return (
    <label htmlFor="search">
      <form name="search" onSubmit={ handleSubmit }>
        <input
          type="text"
          name="value"
          data-testid="search-input"
          onChange={ handleChange }
          value={ filterSearch.value }
          placeholder="Search"
        />
        <div className="search-radio-buttons">
          <label htmlFor="ingredient-search-radio">
            <input
              type="radio"
              name="filter"
              onChange={ handleChange }
              value="Ingredient"
              className="i"
              data-testid="ingredient-search-radio"
              id="ingredient-search-radio"
            />
            Ingrediente
          </label>
          <label htmlFor="name-search-radio">
            <input
              type="radio"
              name="filter"
              value="Name"
              className="s"
              onChange={ handleChange }
              data-testid="name-search-radio"
              id="name-search-radio"
            />
            Nome
          </label>
          <label htmlFor="first-letter-search-radio">
            <input
              type="radio"
              name="filter"
              className="f"
              value="First letter"
              onChange={ handleChange }
              data-testid="first-letter-search-radio"
              id="first-letter-search-radio"
            />
            Primeira letra
          </label>
          <button
            type="submit"
            data-testid="exec-search-btn"
          >
            Search
          </button>
        </div>
      </form>
    </label>
  );
}

export default SearchBar;
