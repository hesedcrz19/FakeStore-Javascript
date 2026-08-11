import { useState, useEffect, useRef, useCallback } from 'react';

import { itsOutside } from '@/utils/itsOutside';

interface useModalProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  autoClose: boolean;
  shouldHideScrollbar: boolean;
  enabled?: boolean;
  initialOpen?: boolean;
  onClose?: () => void;
}

export function useModal({
  dialogRef,
  autoClose,
  shouldHideScrollbar,
  enabled = true,
  initialOpen = false,
  onClose,
}: useModalProps) {
  const [isOpening, setIsOpening] = useState(initialOpen);
  const hiddenScrollbarRef = useRef(false);

  const shouldBeOpen = isOpening && enabled;

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
    dialog.showModal();
    if (shouldHideScrollbar) hideScrollbar();
  }, [hideScrollbar, shouldHideScrollbar, dialogRef]);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.close();
    if (shouldHideScrollbar) showScrollbar();
    if (onClose) onClose();
  }, [showScrollbar, dialogRef, shouldHideScrollbar, onClose]);

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
    };

    dialog.addEventListener('cancel', handleClose);

    return () => {
      dialog.removeEventListener('cancel', handleClose);
    };
  }, [dialogRef]);

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
      }
    };

    dialog.addEventListener('mousedown', handleClick);

    return () => {
      dialog.removeEventListener('mousedown', handleClick);
    };
  }, [dialogRef, autoClose]);

  return {
    isOpening: shouldBeOpen,
    startOpening: () => setIsOpening(true),
    startClosing: () => setIsOpening(false),
    open,
    close,
    showScrollbar,
    hideScrollbar,
  };
}
