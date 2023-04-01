import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImageUrl, alt } = this.props;
    if (!modalImageUrl) {
      return null;
    }
    return (
      <div className={css.Overlay} onClick={this.handleOverlayClick}>
        <div className={css.Modal}>
          <img src={modalImageUrl} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalImageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
