import styles from './ProductModal.module.css';

import { useParams, useSearchParams } from 'react-router';
import { useModal } from '@/hooks/useModal';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { Product } from '@/components/products/Product/Product';
import { motion, type Variants } from 'motion/react';
import { X } from 'lucide-react';

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
        <X />
      </button>
      <Product slug={slug} />
    </motion.dialog>
  );
}
