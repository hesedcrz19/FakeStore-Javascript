import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

export function useCarrousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideToMoveRef = useRef<number>(null);
  const [slider, setSlider] = useState<HTMLDivElement | null>(null);

  // Callback ref
  const sliderRef: React.RefCallback<HTMLDivElement> = useCallback((el) => {
    setSlider(el);
  }, []);

  const slides = useMemo(() => {
    if (!slider) return [];
    return Array.from(slider.children);
  }, [slider]);

  // Callback for intersectionObserver
  const callback: IntersectionObserverCallback = useCallback(
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

    const options: IntersectionObserverInit = {
      root: slider,
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(callback, options);

    slides.forEach((slide) => observer.observe(slide));

    return () => {
      observer.disconnect();
    };
  }, [slides, slider, callback]);

  const moveToSlide = (slide: number) => {
    if (!slider || !slides || !slides[slide]) return;

    slideToMoveRef.current = slide;
    setCurrentSlide(slide);

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

export type CarrouselType = ReturnType<typeof useCarrousel>;
