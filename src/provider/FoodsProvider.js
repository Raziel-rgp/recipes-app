import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FoodsContext from './FoodsContext';
import fetchApi from '../services/fetchApi';

function FoodsProvider({ children }) {
  const [foods, setFoods] = useState();
  const [site, setSite] = useState('');

  const getFoods = (url) => {
    fetchApi(url).then((data) => setFoods(data));
  };

  const contextType = {
    foods,
    getFoods,
    site,
    setSite,
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
