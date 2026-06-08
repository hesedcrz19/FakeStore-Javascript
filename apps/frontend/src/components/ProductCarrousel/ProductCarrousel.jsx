import styles from './ProductCarrousel.module.css';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useEffect, useId, useRef } from 'react';
import { usePc } from '@/hooks/usePc';
import { useCarrousel } from '@/hooks/useCarrousel';

export function ProductCarrousel({ product = {}, loading }) {
  const { currentSlide, moveToSlide, nextSlide, prevSlide, sliderRef, slides } = useCarrousel();
  const isPc = usePc();

  return (
    <div
      className={styles.mainCarrouselContainer}
      role="region"
      aria-roledescription="carrousel"
      aria-label="Product images carrousel"
    >
      <div className={styles.carrouselContainer}>
        {loading ? (
          <Skeleton height="100%" />
        ) : (
          <CarrouselContent
            product={product}
            sliderRef={sliderRef}
            currentSlide={currentSlide}
            moveToSlide={moveToSlide}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
            slides={slides}
          />
        )}
      </div>

      {isPc && (
        <CarrouselThumbnails
          images={product.images}
          currentSlide={currentSlide}
          moveToSlide={moveToSlide}
          loading={loading}
        />
      )}
    </div>
  );
}

function CarrouselContent({
  sliderRef,
  product,
  currentSlide,
  moveToSlide,
  nextSlide,
  prevSlide,
  slides,
}) {
  const { images, title } = product;

  return (
    <>
      <button
        className={styles.prevBtn}
        onClick={prevSlide}
        aria-label="Previous slide"
        disabled={currentSlide === 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
      </button>

      <div className={styles.imagesCarrousel} aria-live="polite" ref={sliderRef}>
        <CarrouselImages
          images={images}
          description={title?.fullContent}
          currentSlide={currentSlide}
          slides={slides}
        />
      </div>

      <button
        className={styles.nextBtn}
        onClick={nextSlide}
        aria-label="Next slide"
        disabled={currentSlide === (slides?.length ?? 1) - 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
      </button>

      <CarrouselTabs currentSlide={currentSlide} moveToSlide={moveToSlide} images={images} />
    </>
  );
}

function CarrouselTabs({ currentSlide, moveToSlide, images }) {
  const tabsId = useId();

  return (
    <div className={styles.carrouselDots} role="radiogroup" aria-label="Select image">
      {(images ?? [null])?.map((_, i) => (
        <input
          key={i}
          type="radio"
          name={tabsId}
          value={i}
          checked={i === currentSlide}
          onChange={(e) => moveToSlide(e.target.value)}
          aria-label={`Image ${i + 1}`}
        />
      ))}
    </div>
  );
}

function CarrouselImages({ images, description, currentSlide, slides }) {
  return (images ?? [null])?.map((img, i) => (
    <div
      key={i}
      className={styles.slide}
      role="group"
      aria-label={`${i + 1} of ${slides?.length ?? 1}`}
      aria-hidden={i !== currentSlide}
    >
      <img
        className={styles.image}
        src={img ?? '/fallback.png'}
        alt={`${description} - Image ${i + 1}`}
        draggable="false"
      />
    </div>
  ));
}

function CarrouselThumbnails({ images, currentSlide, moveToSlide, loading }) {
  const thumbnailsRef = useRef();

  useEffect(() => {
    const thumbnailsContainer = thumbnailsRef.current;

    if (!thumbnailsContainer) return;

    const thumbnails = Array.from(thumbnailsContainer.children);

    thumbnails[currentSlide]?.scrollIntoView({
      inline: 'nearest',
      block: 'nearest',
      behavior: 'smooth',
    });
  }, [currentSlide]);

  return (
    <div className={styles.carrouselThumbnails} ref={thumbnailsRef}>
      {(loading ? Array.from({ length: 3 }).fill(null) : (images ?? [null]))?.map((img, i) => (
        <button
          className={styles.thumbnailButton}
          key={i}
          disabled={!img}
          onClick={() => moveToSlide(i)}
          aria-label={`See image ${i + 1}`}
          aria-current={i === currentSlide}
        >
          {!loading ? <img src={img ?? '/fallback.png'} alt="" /> : <Skeleton height="100%" />}
        </button>
      ))}
    </div>
  );
}
