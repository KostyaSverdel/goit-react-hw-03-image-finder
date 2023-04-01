import React, { Component } from 'react';
import axios from 'axios';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';

class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({ images: [], page: 1 });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query } = this.props;
    const { page } = this.state;
    const API_KEY = '33346847-49a68cc77b2127185fe21774e';
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ loading: true });

    axios
      .get(url)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          page: prevState.page + 1,
          loading: false,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message, loading: false });
      });
  };

  handleImageClick = image => {
    this.setState({ showModal: true, selectedImage: image });
  };

  handleModalClose = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  render() {
    const { images, loading, error, showModal, selectedImage } = this.state;

    return (
      <div className="image-gallery-container">
        <ul className="image-gallery">
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              tags={image.tags}
              onClick={() => this.handleImageClick(image)}
            />
          ))}
        </ul>

        {loading && <Loader />}
        {showModal && selectedImage && (
          <Modal image={selectedImage} onClose={this.handleModalClose} />
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }
}

export default ImageGallery;
