import { useSyncExternalStore } from "react";

export function useMatchMedia(query){
  const subscribe = (callback) => {
    const mediaQuery = window.matchMedia(query);

    mediaQuery.addEventListener('change', callback);

    return () => {
      mediaQuery.removeEventListener('change', callback);
    }
  }

  const getSnapshot = () =>{
    return window.matchMedia(query).matches;
  }

  return useSyncExternalStore(subscribe, getSnapshot);
}