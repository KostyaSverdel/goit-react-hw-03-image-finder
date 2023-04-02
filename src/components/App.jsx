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
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({ query, page: 1, images: [] });
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          page: prevState.page + 1,
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
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchImages();
      }
    );
  };

  render() {
    const { images, isLoading, isModalOpen, modalImageUrl } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onChangeQuery} />

        <ImageGallery images={images} onImageClick={this.openModal} />

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
