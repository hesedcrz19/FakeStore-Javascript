import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { itsOutside } from '@/utils/itsOutside';

export interface ModalControls {
  isOpen: boolean;
  isOpening: boolean;
  startOpening: () => void;
  startClosing: () => void;
  open: () => void;
  close: () => void;
}
interface useModalProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  autoClose: boolean;
  shouldHideScrollbar: boolean;
  controlTheTransitions?: boolean;
  onClose?: () => void;
  initialOpen?: boolean;
}

export function useModal({
  dialogRef,
  autoClose,
  shouldHideScrollbar,
  controlTheTransitions = false,
  onClose,
  initialOpen = false,
}: useModalProps): ModalControls {
  const [isOpening, setIsOpening] = useState(initialOpen);
  const [isOpen, setIsOpen] = useState(initialOpen);
  const hiddenScrollbarRef = useRef(false);

  const hideScrollbar = useCallback(() => {
    if (hiddenScrollbarRef.current) return;
    if (window.innerWidth > document.documentElement.clientWidth) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.top = `-${window.scrollY}px`;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    hiddenScrollbarRef.current = true;
  }, []);

  const showScrollbar = useCallback(() => {
    if (!hiddenScrollbarRef.current) return;
    document.body.style.paddingRight = '';
    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(document.body.style.top || '0') * -1);
    document.body.style.top = '';
    hiddenScrollbarRef.current = false;
  }, []);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!isOpening) setIsOpening(true);
    setIsOpen(true);

    dialog.showModal();

    if (shouldHideScrollbar) hideScrollbar();
  }, [hideScrollbar, shouldHideScrollbar, dialogRef, isOpening]);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpening) setIsOpening(false);
    setIsOpen(false);

    dialog.close();

    if (shouldHideScrollbar) showScrollbar();
    if (onClose) onClose();
  }, [showScrollbar, dialogRef, shouldHideScrollbar, onClose, isOpening]);

  // Close the modal when the component is dismounting
  useEffect(() => {
    return () => {
      if (shouldHideScrollbar) {
        showScrollbar();
      }
    };
  }, [shouldHideScrollbar, showScrollbar]);

  // Synchronize with (Esc)
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const handleClose = (e: Event) => {
      e.preventDefault();
      setIsOpening(false);
      if (!controlTheTransitions) close();
    };

    dialog.addEventListener('cancel', handleClose);

    return () => {
      dialog.removeEventListener('cancel', handleClose);
    };
  }, [dialogRef, controlTheTransitions, close]);

  // Detect click outside the dialog
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const handleClick = (event: MouseEvent) => {
      if (
        event.target === dialog &&
        itsOutside(dialog, event.clientX, event.clientY) &&
        autoClose
      ) {
        setIsOpening(false);
        if (!controlTheTransitions) close();
      }
    };

    dialog.addEventListener('mousedown', handleClick);

    return () => {
      dialog.removeEventListener('mousedown', handleClick);
    };
  }, [dialogRef, autoClose, controlTheTransitions, close]);

  const startOpening = useCallback(() => setIsOpening(true), []);
  const startClosing = useCallback(() => setIsOpening(false), []);

  return useMemo(
    () => ({
      isOpening,
      isOpen,
      startOpening,
      startClosing,
      open,
      close,
    }),
    [close, open, startClosing, startOpening, isOpening, isOpen]
  );
}
