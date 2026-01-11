export interface CartProduct {
  productId: {
    _id: string;
    title: string;
    imageCover: {
      secure_url: string;
    };
    category?: {
      _id: string;
      name: string;
    };
    price: number;
    description?: string;
  };
  quantity: number;
  price: number;
  _id: string;
}

export interface Cart {
  _id: string;
  user: string;
  products: CartProduct[];
  totalPrice: number;
  totalPriceAfterDiscount?: number;
}

export interface CartState {
  cart: Cart | null;
  noOfCartItems: number;
  noOfProducts: number;
  isLoading: boolean;
  error: string | null;
}
