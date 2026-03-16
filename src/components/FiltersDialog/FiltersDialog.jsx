import styles from "./FiltersDialog.module.css";

import { useRef, useEffect, useEffectEvent } from "react";
import { useMatchMedia } from "../../hooks/useMatchMedia.jsx";
import { useModal } from "../../hooks/useModal.jsx"

import { Filters } from "../Filters/Filters";

export function FiltersDialog({ openBtn = undefined }) {
  const filtersRef = useRef(null);
  const isPc = useMatchMedia("(min-width: 1000px)");
  const { openModal, closeModal } = useModal({dialogRef: filtersRef, enabled: !isPc, closeOutside: true});

  useEffect(() => {
    const btn = openBtn.current;

    if(!btn) return;

    const handleClick = () => {
      openModal();
    }

    btn.addEventListener('click', handleClick);

    return () => {
      btn.removeEventListener('click', handleClick);
    }
  }, [openBtn, openModal])

  return (
    <>
      <dialog className={styles.filtersDialog} data-direction="right" ref={filtersRef}>
        <div className={styles.filtersDialogFlex}>
          <button className={styles.filtersDialogClose} onClick={closeModal} aria-label="close filters">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
          <Filters />
        </div>
      </dialog>
    </>
  );
}
