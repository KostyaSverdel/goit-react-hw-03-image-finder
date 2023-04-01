import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import PropTypes from 'prop-types';
import axios from 'axios';

class App extends Component {
  state = {
    query: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    selectedImage: null,
  };

  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ),
    loading: PropTypes.bool.isRequired,
    showModal: PropTypes.bool.isRequired,
    selectedImage: PropTypes.object,
    error: PropTypes.string,
    page: PropTypes.number.isRequired,
    query: PropTypes.string.isRequired,
  };

  handleFormSubmit = query => {
    this.setState({ query, images: [], page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;
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

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
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
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {error && <p>{error}</p>}

        {images.length > 0 && (
          <>
            <ImageGallery
              images={images}
              onImageClick={this.handleImageClick}
            />
            {loading && <Loader />}
            {!loading && <Button onClick={this.handleLoadMore} />}
          </>
        )}

        {showModal && (
          <Modal onClose={this.handleModalClose}>
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
