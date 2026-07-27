import styles from './ProductModal.module.css';

import { useParams } from 'react-router';
import { useModal } from '@/hooks/useModal';
import { useRef } from 'react';
import { useNavigate } from 'react-router';

import { Product } from '@/components/Product/Product';

export default function ProductModal() {
  const dialogRef = useRef(null);
  const navigate = useNavigate();
  const { closeModal } = useModal({
    dialogRef,
    closeDelay: 200,
    initialState: true,
    onClose: () => {
      void navigate('/products', { replace: true });
    },
  });
  const { slug } = useParams();

  return (
    <dialog ref={dialogRef} className={styles.modal}>
      <button className={styles.closeBtn} onClick={closeModal} aria-label="close menu">
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
      <Product slug={slug} />
    </dialog>
  );
}
