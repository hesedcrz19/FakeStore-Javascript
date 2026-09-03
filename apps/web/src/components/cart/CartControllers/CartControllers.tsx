import { useCartStore } from '@/stores/cartStore';
import type { HTMLAttributes } from 'react';

type CartControllersProps = HTMLAttributes<HTMLDivElement> & { id: string; quantity: number };

export function CartControllers({ id, quantity, ...props }: CartControllersProps) {
  const increaseItem = useCartStore((store) => store.increaseItem);
  const decreaseItem = useCartStore((store) => store.decreaseItem);

  return (
    <div {...props}>
      <button onClick={() => decreaseItem(id)}>−</button>
      <span>{quantity}</span>
      <button onClick={() => increaseItem(id)}>+</button>
    </div>
  );
}
