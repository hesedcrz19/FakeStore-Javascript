import styles from './ProductCarrousel.module.css';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useEffect, useId, useRef, type ChangeEvent } from 'react';
import { usePc } from '@/hooks/usePc';
import type { FormattedProduct } from '@/types/formattedProduct';
import { CarrouselProvider, useCarrouselContext } from '@/context/CarrouselContext';

interface ProductCarrouselType {
  product: Partial<FormattedProduct>;
  loading: boolean;
}
export function ProductCarrousel({ product = {}, loading }: ProductCarrouselType) {
  const isPc = usePc();

  return (
    <CarrouselProvider>
      <div
        className={styles.mainCarrouselContainer}
        role="region"
        aria-roledescription="carrousel"
        aria-label="Product images carrousel"
      >
        <div className={styles.carrouselContainer}>
          {loading ? <Skeleton height="100%" /> : <CarrouselContent product={product} />}
        </div>

        {isPc && <CarrouselThumbnails images={product.images} loading={loading} />}
      </div>
    </CarrouselProvider>
  );
}

function CarrouselContent({ product }: { product: Partial<FormattedProduct> }) {
  const { images, title } = product;
  const { sliderRef, currentSlide, nextSlide, prevSlide, slides } = useCarrouselContext();

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
        <CarrouselImages images={images} description={title?.fullContent} />
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

      <CarrouselTabs images={images} />
    </>
  );
}

function CarrouselImages({ images, description }: { images?: string[]; description?: string }) {
  const { currentSlide, slides } = useCarrouselContext();
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

function CarrouselTabs({ images }: { images?: string[] }) {
  const { currentSlide, moveToSlide } = useCarrouselContext();
  const tabsId = useId();

  return (
    <div className={styles.carrouselDots} role="radiogroup" aria-label="Select image">
      {(images ?? [null])?.map((_, i) => (
        <label key={i}>
          <input
            type="radio"
            name={tabsId}
            value={i}
            checked={i === currentSlide}
            onChange={(e: ChangeEvent<HTMLInputElement>) => moveToSlide(Number(e.target.value))}
            aria-label={`Image ${i + 1}`}
          />
        </label>
      ))}
    </div>
  );
}

function CarrouselThumbnails({ loading, images }: { loading: boolean; images?: string[] }) {
  const { currentSlide, moveToSlide } = useCarrouselContext();
  const thumbnailsRef = useRef<HTMLDivElement>(null);

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
      {(loading ? Array<null>(3).fill(null) : (images ?? [null]))?.map((img, i) => (
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
