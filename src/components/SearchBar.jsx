import React from 'react';

function SearchBar() {
  return (
    <label htmlFor="search">
      <form name="search">
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search"
        />
        <div className="search-radio-buttons">
          <label htmlFor="ingredient-search-radio">
            <input
              type="radio"
              name="searchRadio"
              data-testid="ingredient-search-radio"
              id="ingredient-search-radio"
            />
            Ingrediente
          </label>
          <label htmlFor="name-search-radio">
            <input
              type="radio"
              name="searchRadio"
              data-testid="name-search-radio"
              id="name-search-radio"
            />
            Nome
          </label>
          <label htmlFor="first-letter-search-radio">
            <input
              type="radio"
              name="searchRadio"
              data-testid="first-letter-search-radio"
              id="first-letter-search-radio"
            />
            Primeira letra
          </label>
          <button
            type="button"
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
