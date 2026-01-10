import { IProduct } from "./Iproducts";

export interface WishlistState {
  items: IProduct[];
  isLoading: boolean;
  error: string | null;
}
