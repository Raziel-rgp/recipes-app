import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FoodsContext from './FoodsContext';
import fetchApi from '../services/fetchApi';

function FoodsProvider({ children }) {
  const [foods, setFoods] = useState();

  const getFoods = (value, type) => {
    fetchApi(value, type).then((data) => setFoods(data));
  };

  const contextType = {
    foods,
    getFoods,
  };

  return (
    <FoodsContext.Provider value={ contextType }>
      {children}
    </FoodsContext.Provider>
  );
}

FoodsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodsProvider;
