import styles from './ModalProduct.module.css';

import { useParams } from 'react-router';
import { useModal } from '@/hooks/useModal';
import { useRouter } from '@/hooks/useRoute';
import { useRef } from 'react';

import { Product } from '@/components/Product/Product';

export default function ModalProduct() {
  const dialogRef = useRef(null);
  const { navigate } = useRouter();
  useModal({
    dialogRef,
    closeDelay: 200,
    initialState: true,
    onClose: () => {
      navigate('/products', { replace: true });
    },
  });
  const { slug } = useParams();

  return (
    <dialog ref={dialogRef} className={styles.modal}>
      <Product slug={slug} />
    </dialog>
  );
}
