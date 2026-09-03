import { LoaderCube } from '../LoaderCube/LoaderCube';
import styles from './LoadingDialog.module.css';
import { useRef, useEffect } from 'react';

export function LoadingDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    dialogRef.current.showModal();
  }, []);

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.container}>
        <button
          onClick={() => {
            if (!dialogRef.current) return;
            dialogRef.current.close();
          }}
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
        Please wait the server is waking up...
        <LoaderCube />
      </div>
    </dialog>
  );
}
