import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { toast } from 'sonner';
import { useCartStore } from '@/stores/cartStore';
import { CartToast } from '../CartToast/CartToast';
import { CartControllers } from '../CartControllers/CartControllers';
import { Trash } from 'lucide-react';

type AddToCartButtonProps = {
  id: string;
  image?: string | null;
  title: string;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  controlProps?: HTMLAttributes<HTMLDivElement>;
  deleteBtnProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export function AddToCartButton({
  id,
  title,
  image,
  buttonProps,
  controlProps,
  deleteBtnProps,
}: AddToCartButtonProps) {
  const { addItem, cart, removeItem } = useCartStore();

  const handleAddToCart = (id: string) => {
    addItem(id);
    toast(<CartToast image={image} title={title} />);
  };

  if (Object.keys(cart).includes(id))
    return (
      <>
        <CartControllers {...controlProps} id={id} quantity={cart[id].quantity} />
        <button {...deleteBtnProps} onClick={() => removeItem(id)}>
          <Trash />
        </button>
      </>
    );

  return (
    <button {...buttonProps} onClick={() => handleAddToCart(id)}>
      Add to Cart
    </button>
  );
}
