import { useCarrousel, type CarrouselType } from '@/hooks/useCarrousel';
import { type PropsWithChildren, createContext, useContext } from 'react';

const CarrouselContext = createContext<CarrouselType | null>(null);

export function CarrouselProvider({ children }: PropsWithChildren) {
  const carrousel = useCarrousel();

  return <CarrouselContext.Provider value={carrousel}>{children}</CarrouselContext.Provider>;
}

export function useCarrouselContext() {
  const context = useContext(CarrouselContext);

  if (!context) throw new Error('useCarrouselContext must be used within FiltersProvider');

  return context;
}
