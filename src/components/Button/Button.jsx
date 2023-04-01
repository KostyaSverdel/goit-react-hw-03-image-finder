import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  };

  render() {
    const { onClick, label } = this.props;
    const { images } = this.props;

    return (
      <>
        {images.length > 0 && (
          <button type="button" className="Button" onClick={onClick}>
            {label}
          </button>
        )}
      </>
    );
  }
}

export default Button;
