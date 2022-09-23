import React from 'react';

function SearchBar() {
  return (
    <label htmlFor="search">
      <form name="search">

        <input
          type="text"
          data-testid="search-input"
        />
        <div className="search-radio-buttons">
          <input type="radio" data-testid="ingredient-search-radio" />
          Ingrediente

          <input type="radio" data-testid="name-search-radio" />
          Nome

          <input type="radio" data-testid="first-letter-search-radio" />
          Primeira letra

          <button
            type="button"
            data-testid="exec-search-btn"
          >
            Buscar
          </button>
        </div>
      </form>
    </label>
  );
}

export default SearchBar;
