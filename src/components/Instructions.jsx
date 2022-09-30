import React from 'react';
import PropTypes from 'prop-types';

function Instructions({ instructions }) {
  return (
    <div>
      <h4 className="instructions-title">Instructions</h4>
      <p
        className="instructions"
        data-testid="instructions"
      >
        { instructions }
      </p>
    </div>
  );
}

Instructions.propTypes = {
  instructions: PropTypes.string.isRequired,
};

export default Instructions;
