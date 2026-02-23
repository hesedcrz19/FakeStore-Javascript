import { useState, useEffect } from "react";

export function useModal(dialogRef, enabled = true){
  const [isOpen, setOpen] = useState(false);

  const shouldBeOpen = isOpen && enabled;

  // Sincroniza estado → dialog
  useEffect(() => {
    const dialog = dialogRef.current;

    console.log(dialog)

    if (!dialog) return;

    if (shouldBeOpen && !dialog.open) {
      dialog.showModal();
    } else if (!shouldBeOpen && dialog.open) {
      dialog.close();
    }
  }, [shouldBeOpen, dialogRef]);
  

  // Sincronizar con (Esc)
  useEffect(() => {
    const dialog = dialogRef.current;
    
    if (!dialog) return;

    console.log('effect');

    const handleClose = () => {
      console.log('cancel')
      setOpen(false);
    };

    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [dialogRef]);

  return {
    isOpen, 
    openModal: () => setOpen(true), 
    closeModal: () => setOpen(false)
  };
}