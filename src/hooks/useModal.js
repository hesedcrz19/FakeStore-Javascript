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
    dialogRef?.current.close();
    if (hideScrollbar) {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }
  }
  function openModal() {
    dialogRef?.current.showModal();
    if (hideScrollbar) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "10px";
    }
  }

  // Sincronize state → dialog
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (shouldBeOpen && !dialog.open) {
      openModal();
    } else if (!shouldBeOpen && dialog.open) {
      closeModal();
    }
  }, [shouldBeOpen, dialogRef]);

  // Sincronize with (Esc)
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const handleClose = () => {
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
