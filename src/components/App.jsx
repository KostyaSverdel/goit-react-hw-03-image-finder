import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from '../components/App.module.css';

const API_KEY = '33346847-49a68cc77b2127185fe21774e';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    isModalOpen: false,
    modalImageUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({ query, page: 1, images: [] });
  };

  fetchImages = () => {
    const { query, page, images } = this.state;
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const newImages = data.hits.filter(
          hit => !images.find(img => img.id === hit.id)
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          isLoading: false,
        }));
      })
      .catch(error => {
        console.error('Error fetching images', error);
        this.setState({ isLoading: false });
      });
  };

  openModal = imageUrl => {
    this.setState({ isModalOpen: true, modalImageUrl: imageUrl });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, modalImageUrl: '' });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      isLoading: true,
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, isModalOpen, modalImageUrl } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onChangeQuery} />

        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.openModal} />
        )}

        {isLoading && <Loader />}

        {shouldRenderLoadMoreButton && <Button onClick={this.handleLoadMore} />}

        {isModalOpen && (
          <Modal onClose={this.closeModal} modalImageUrl={modalImageUrl} alt="">
            <img src={modalImageUrl} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
