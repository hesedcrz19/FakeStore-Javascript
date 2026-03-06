import { useState, useEffect } from "react";

export function useModal(dialogRef, enabled = true, closeOutside = false){
  const [open, setOpen] = useState(false);

  const shouldBeOpen = open && enabled;

  // Sincronize state → dialog
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (shouldBeOpen && !dialog.open) {
      dialog.showModal();
    } else if (!shouldBeOpen && dialog.open) {
      dialog.close();
    }
  }, [shouldBeOpen, dialogRef]);
  

  // Sincronize with (Esc)
  useEffect(() => {
    console.log(dialogRef)
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
      
      if (event.target === dialog && closeOutside) {
        setOpen(false);
      }
    };

    dialog.addEventListener('click', handleClick);

    return () => {
      dialog.removeEventListener("click", handleClick);
    };
  }, [dialogRef]);

  return {
    open, 
    openModal: () => setOpen(true), 
    closeModal: () => setOpen(false)
  };
}