import { useSyncExternalStore } from 'react';

export function useMatchMedia(query: string) {
  const subscribe = (callback: EventListenerOrEventListenerObject) => {
    const mediaQuery = window.matchMedia(query);

    mediaQuery.addEventListener('change', callback);

    return () => {
      mediaQuery.removeEventListener('change', callback);
    };
  };

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  return useSyncExternalStore(subscribe, getSnapshot);
}
