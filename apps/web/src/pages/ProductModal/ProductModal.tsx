import styles from './ProductModal.module.css';

import { useParams, useSearchParams } from 'react-router';
import { useModal } from '@/hooks/useModal';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { Product } from '@/components/Product/Product';
import { motion, type Variants } from 'motion/react';

const dialogVariants: Variants = {
  close: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

export default function ProductModal() {
  const dialogRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isOpening, close, open, startClosing } = useModal({
    dialogRef,
    initialOpen: true,
    autoClose: true,
    shouldHideScrollbar: true,
    onClose: () => {
      void navigate(`/products?${searchParams.toString()}`, { replace: true });
    },
  });
  const { slug } = useParams();

  useEffect(() => {
    if (isOpening) open();
  }, [isOpening, open]);

  return (
    <motion.dialog
      variants={dialogVariants}
      initial={'close'}
      animate={isOpening ? 'open' : 'close'}
      onAnimationComplete={(variant) => {
        if (variant === 'close') close();
      }}
      ref={dialogRef}
      className={styles.modal}
    >
      <button className={styles.closeBtn} onClick={startClosing} aria-label="close menu">
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
    </motion.dialog>
  );
}
