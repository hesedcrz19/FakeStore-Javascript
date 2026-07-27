import { useMatchMedia } from './useMatchMedia';

export function usePc() {
  return useMatchMedia('(min-width: 768px)');
}
