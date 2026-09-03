import type { ModalControls } from '@/hooks/useModal';
import { createContext, useCallback, useContext, useState, type PropsWithChildren } from 'react';

type ModalsControls = Record<string, ModalControls>;

type ModalContextType = {
  addModalControls: (modalKey: string, controls: ModalControls) => void;
  startOpening: (modal: string) => void;
  startClosing: (modal: string) => void;
  open: (modal: string) => void;
  close: (modal: string) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalContextProvider(props: PropsWithChildren) {
  const [modalsControls, setModalsControls] = useState<ModalsControls>({});

  const startOpening = useCallback(
    (modalKey: string) => {
      modalsControls[modalKey].startOpening();
    },
    [modalsControls]
  );
  const startClosing = useCallback(
    (modalKey: string) => {
      modalsControls[modalKey].startClosing();
    },
    [modalsControls]
  );
  const open = useCallback(
    (modalKey: string) => {
      modalsControls[modalKey].open();
    },
    [modalsControls]
  );
  const close = useCallback(
    (modalKey: string) => {
      modalsControls[modalKey].close();
    },
    [modalsControls]
  );

  const addModalControls = useCallback((modalKey: string, controls: ModalControls) => {
    setModalsControls((prev) => ({ ...prev, [modalKey]: controls }));
  }, []);

  return (
    <ModalContext
      {...props}
      value={{ startOpening, startClosing, open, close, addModalControls }}
    />
  );
}

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) throw new Error('useModalContext must be used within ModalContextProvider');

  return context;
};
