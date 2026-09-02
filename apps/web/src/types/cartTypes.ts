export interface CartItem {
  quantity: number;
}

export type Cart = Record<string, CartItem>;
