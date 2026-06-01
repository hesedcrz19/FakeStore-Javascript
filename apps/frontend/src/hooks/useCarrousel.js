import { useEffect, useRef, useState, useCallback } from 'react';

export function useCarrousel() {
  const [slider, setSlider] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useRef();
  const slideToMoveRef = useRef(null);

  // Callback ref
  const sliderRef = useCallback((el) => {
    if (el) setSlider(el);
  }, []);

  // Callback for intersectionObserver
  const callback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || !slides.current) return;

      const index = Array.from(slides.current).indexOf(entry.target);

      if (slideToMoveRef.current !== null) {
        if (slideToMoveRef.current === index) {
          slideToMoveRef.current = null;
        }
      } else {
        setCurrentSlide(index);
      }
    });
  }, []);

  // Create observer
  useEffect(() => {
    if (!slider) return;

    const options = {
      root: slider,
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(callback, options);

    const slidesArray = Array.from(slider.children);
    slidesArray.forEach((slide) => observer.observe(slide));
    slides.current = slidesArray;

    return () => {
      observer.disconnect();
    };
  }, [slider, callback]);

  const moveToSlide = (slide) => {
    if (!slider || !slides.current || !slides.current[slide]) return;

    slideToMoveRef.current = Number(slide);
    setCurrentSlide(Number(slide));

    slides.current[slide].scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  const nextSlide = () => {
    if (!slides.current) return;
    const nextSlide = (currentSlide + 1) % slides.current.length;
    moveToSlide(nextSlide);
  };

  const prevSlide = () => {
    if (!slides.current) return;
    const prevSlide =
      (currentSlide - 1 + slides.current.length) % slides.current.length;
    moveToSlide(prevSlide);
  };

  return { currentSlide, moveToSlide, nextSlide, prevSlide, sliderRef, slides };
}
