import styles from "./FiltersButton.module.css";

import { useRef } from "react";
import { useMatchMedia } from "@/hooks/useMatchMedia.js";
import { useModal } from "@/hooks/useModal.js";

import { Filters } from "../Filters/Filters";

export function FiltersButton() {
  const filtersRef = useRef(null);
  const isPc = useMatchMedia("(min-width: 1000px)");
  const { openModal, closeModal } = useModal({
    dialogRef: filtersRef,
    enabled: !isPc,
    hideScrollbar: false,
  });

  return (
    <>
      <button
        className={styles.filtersButton}
        aria-label="open filters"
        onClick={openModal}
      >
        Filters
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
        </svg>
      </button>
      <dialog
        className={styles.filtersDialog}
        data-direction="right"
        ref={filtersRef}
      >
        <div className={styles.filtersDialogFlex}>
          <button
            className={styles.filtersDialogClose}
            onClick={closeModal}
            aria-label="close filters"
          >
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
