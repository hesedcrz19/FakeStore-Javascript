import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

export function useCarrousel() {
  const [slider, setSlider] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideToMoveRef = useRef(null);
  const slides = useMemo(() => {
    if (!slider) return;
    return Array.from(slider.children);
  }, [slider]);

  // Callback ref
  const sliderRef = useCallback((el) => {
    if (el) setSlider(el);
  }, []);

  // Callback for intersectionObserver
  const callback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !slides) return;

        const index = Array.from(slides).indexOf(entry.target);

        if (slideToMoveRef.current !== null) {
          if (slideToMoveRef.current === index) {
            slideToMoveRef.current = null;
          }
        } else {
          setCurrentSlide(index);
        }
      });
    },
    [slides]
  );

  // Create observer
  useEffect(() => {
    if (!slides || !slider) return;

    const options = {
      root: slider,
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(callback, options);

    slides.forEach((slide) => observer.observe(slide));

    return () => {
      observer.disconnect();
    };
  }, [slides, slider, callback]);

  const moveToSlide = (slide) => {
    if (!slider || !slides || !slides[slide]) return;

    slideToMoveRef.current = Number(slide);
    setCurrentSlide(Number(slide));

    slides[slide].scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  const nextSlide = () => {
    if (!slides) return;
    const nextSlide = (currentSlide + 1) % slides.length;
    moveToSlide(nextSlide);
  };

  const prevSlide = () => {
    if (!slides) return;
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
    moveToSlide(prevSlide);
  };

  return { currentSlide, moveToSlide, nextSlide, prevSlide, sliderRef, slides };
}
