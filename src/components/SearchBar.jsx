import React, { useState, useContext } from 'react';
import FoodsContext from '../provider/FoodsContext';

function SearchBar() {
  const [filterSearch, setFilterSearch] = useState({
    value: '',
    filter: '',
    type: '',
  });
  const { getFoods } = useContext(FoodsContext);

  const handleChange = ({ target: { name, value, className } }) => {
    console.log(className);
    setFilterSearch({
      ...filterSearch,
      [name]: value,
      type: className,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getFoods(filterSearch.value, filterSearch.type);
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
