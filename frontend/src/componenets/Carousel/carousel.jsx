import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 8000);

    return () => clearInterval(interval);
  }, []); // empty dependency array ensures that the effect runs only once

return (
  <div className={styles.carouselWrap}>
    
    {/* LEFT ARROW */}
    <button
      className={`${styles.arrow} ${styles.arrowLeft}`}
      onClick={previousImage}
      aria-label="Previous slide"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>

    {/* SLIDE */}
    <div className={styles.slide}>
      <div className={styles.slideCard}>
        
        {/* LEFT SIDE TEXT */}
        <div className={styles.slideText}>
          <h2 className={styles.slideTitle}>
            {images[currentImageIndex]?.name}
          </h2>
          <p className={styles.slideSubtitle}>
            {images[currentImageIndex]?.description}
          </p>

          {/* Optional: you can add CTA buttons later */}
          {/* <div className={styles.ctaRow}>
            <button className={styles.ctaPrimary}>Shop Now</button>
            <button className={styles.ctaSecondary}>Learn More</button>
          </div> */}
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className={styles.slideImage}>
          <img
            src={images[currentImageIndex]?.url}
            alt={`Image ${currentImageIndex}`}
          />
        </div>

      </div>
    </div>

    {/* RIGHT ARROW */}
    <button
      className={`${styles.arrow} ${styles.arrowRight}`}
      onClick={nextImage}
      aria-label="Next slide"
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </button>

  </div>
);

}
export default Carousel;
