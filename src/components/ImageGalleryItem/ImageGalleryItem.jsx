import React from 'react';
import PropTypes from 'prop-types';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, onClick }) => (
  <li className={css.ImageGalleryItem} onClick={onClick}>
    <img className={css.ImageGalleryItemImage} src={src} alt="" />
  </li>
);

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
