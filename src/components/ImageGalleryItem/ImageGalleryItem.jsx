import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, onClick }) => (
  <li className="gallery-item" onClick={onClick}>
    <img src={src} alt="" />
  </li>
);

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
