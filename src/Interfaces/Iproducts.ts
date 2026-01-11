export interface ProductImage {
  secure_url: string;
  public_id: string;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  imageCover: ProductImage;
  subImages: ProductImage[];
  price: number;
  discount: number;
  stock: number;
  category: {
    _id: string;
    name: string;
  };
  product: {
    _id: string;
    id: string;
    name: string;
    image: {
      secure_url: string;
      public_id: string;
    };
    createdBy: string;
  };
  createdBy: {
    _id: string;
    id: string;
    userName: string;
    mobileNumber: string;
  };
  updatedBy: string;
  Reviews: any[];
  rate?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  data: IProduct[];
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    prevPage: number | null;
  };
}
export interface IRelatedProduct extends IProduct {
  image: string;
}

export interface IProductStats {
  totalProducts: number;
  lowStockProducts: number;
  trendingProducts: IProduct[];
  [key: string]: any;
}