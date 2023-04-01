import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
  <button type="button" className="button" onClick={onClick}>
    <span className="button-label">Load more</span>
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
