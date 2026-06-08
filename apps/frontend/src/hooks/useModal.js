import { useState, useEffect, useRef, useCallback } from 'react';

import { itsOutside } from '@/utils/itsOutside';

const resetScroll = () => {
  window.scrollTo(0, 0);
  document.body.style.top = '';
};

const hideScrollbar = () => {
  if (window.innerWidth > document.documentElement.clientWidth) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  document.documentElement.style.overflow = 'hidden';
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
};

const showScrollbar = () => {
  document.body.style.paddingRight = '';
  document.documentElement.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
  window.scrollTo(0, parseInt(document.body.style.top || '0') * -1);
  document.body.style.top = '';
};

export function useModal({
  dialogRef,
  enabled = true,
  autoClose = true,
  hiddenScrollbar = true,
  initialState = false,
  onClose = undefined,
  closeDelay = 0,
}) {
  const [open, setOpen] = useState(initialState);
  const hiddenScrollbarRef = useRef(false);

  const shouldBeOpen = open && enabled;

  const closeModal = useCallback(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    dialog.dataset.open = 'false';

    setTimeout(() => {
      dialog.close();

      if (onClose) onClose();
    }, closeDelay);
  }, [dialogRef, closeDelay, onClose]);

  const openModal = useCallback(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    dialog.dataset.open = 'true';
    dialog.showModal();
  }, [dialogRef]);

  // Close the modal when the component is dismounting
  useEffect(() => {
    return () => {
      if (hiddenScrollbar && hiddenScrollbarRef.current) {
        showScrollbar();
        hiddenScrollbarRef.current = false;
      }
    };
  }, [hiddenScrollbar, onClose]);

  // Synchronize state → dialog
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (shouldBeOpen && !dialog.open) {
      openModal();
    } else if (!shouldBeOpen && dialog.open) {
      closeModal();
    }
  }, [shouldBeOpen, dialogRef, openModal, closeModal]);

  // Synchronize state → scrollbar
  useEffect(() => {
    if (shouldBeOpen) {
      if (hiddenScrollbar && !hiddenScrollbarRef.current) {
        hideScrollbar();
        hiddenScrollbarRef.current = true;
      }
    } else {
      if (hiddenScrollbar && hiddenScrollbarRef.current) {
        showScrollbar();
        hiddenScrollbarRef.current = false;
      }
    }

    return () => {
      if (hiddenScrollbar && hiddenScrollbarRef.current) {
        showScrollbar();
        hiddenScrollbarRef.current = false;
      }
    };
  }, [shouldBeOpen, hiddenScrollbar]);

  // Synchronize with (Esc)
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const handleClose = (e) => {
      e.preventDefault();
      setOpen(false);
    };

    dialog.addEventListener('cancel', handleClose);

    return () => {
      dialog.removeEventListener('cancel', handleClose);
    };
  }, [dialogRef, onClose]);

  // Detect click outside the dialog
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const handleClick = (event) => {
      if (
        event.target === dialog &&
        itsOutside(dialog, event.clientX, event.clientY) &&
        autoClose
      ) {
        setOpen(false);
      }
    };

    dialog.addEventListener('mousedown', handleClick);

    return () => {
      dialog.removeEventListener('mousedown', handleClick);
    };
  }, [dialogRef, autoClose]);

  return {
    open: shouldBeOpen,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
    resetScroll,
  };
}
