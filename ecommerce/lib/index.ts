export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export async function getAllProducts(): Promise<IProduct[]> {
    const res = await fetch('https://fakestoreapi.com/products/');
    const data = await res.json();
    return data;
}
