export type FindManyByUserIdQuery = Array<{
  id: string;
  client: {
    id: string;
    name: string;
    document: string;
  };
  products: Array<{
    quantity: number;
    product: {
      id: string;
      name: string;
      price: number;
      description?: string;
    };
  }>;
}>;
