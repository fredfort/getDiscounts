export interface ProductObj{
  fetching: boolean;
  fetchingError: boolean;
  products: Product[];
}

export interface Product{
  _id?: string;
  description: string;
  quantity: number;
  active: boolean;
}
