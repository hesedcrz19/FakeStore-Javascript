import { useState, useEffect } from "react";

export function useModal({
  dialogRef,
  enabled = true,
  autoClose = true,
  hideScrollbar = true,
}) {
  const [open, setOpen] = useState(false);

  const shouldBeOpen = open && enabled;

  function closeModal() {
    const dialog = dialogRef.current;

    dialog.dataset.open = "false";

    setTimeout(() => {
      dialog.close();
      if (hideScrollbar) {
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0px";
      }
    }, 150);
  }
  function openModal() {
    const dialog = dialogRef.current;

    dialog.dataset.open = "true";

    dialog.showModal();
    if (hideScrollbar) {
      document.body.style.overflow = "hidden";

      if (!window.matchMedia("max-width: 768px").matches) return;

      document.body.style.paddingRight = "10px";
    }
  }

  // Sincronize state → dialog
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (shouldBeOpen && !dialog.open) {
      openModal();
    } else if (!shouldBeOpen) {
      closeModal();
    }
  }, [shouldBeOpen, dialogRef]);

  // Sincronize with (Esc)
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const handleClose = (e) => {
      e.preventDefault()
      setOpen(false);
    };

    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [dialogRef]);

  // Detect click outside the dialog
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const handleClick = (event) => {
      if (event.target === dialog && autoClose) {
        setOpen(false);
      }
    };

    dialog.addEventListener("click", handleClick);

    return () => {
      dialog.removeEventListener("click", handleClick);
    };
  }, [dialogRef]);

  return {
    open,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
  };
}
