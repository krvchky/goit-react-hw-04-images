import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import fetchImages from './Services/API';
import Loader from './Loader/Loader';

import React, { useState, useEffect, useMemo } from 'react';
import { animateScroll } from 'react-scroll';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const per_page = 12;

  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (searchQuery, page) => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);

    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      if (hits.length === 0) {
        return alert('Sorry, nothing found 🤷‍♂️');
      }
      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / per_page));
    } catch (error) {
      setError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const formSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
    scrollOnMoreButton();
  };

  const scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  const memoizedImageGallery = useMemo(
    () => <ImageGallery images={images} openModal={openModal} />,
    [images]
  );

  return (
    <>
      <Searchbar onSubmit={formSubmit} />
      {isLoading && <Loader />}
      {memoizedImageGallery}
      {error && <p>❌something went wrong❌</p>}
      {loadMore && <Button onLoadMore={onLoadMore} />}
      {showModal && <Modal largeImageURL={largeImageURL} onClose={closeModal} />}
    </>
  );
};

export default App;