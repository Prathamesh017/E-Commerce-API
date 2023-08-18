export interface responseInterface {
  message: string;
  data: [] | String[] | Product[] | Cart[]
  size?: Number
}

export interface Product {
  title: string
  description: string
  price: number
  rating: number
  stock: number
  brand: string
  category: string
}

export interface Cart {
  id: string;
  userId: string
  items: {
    productId: string,
    quantity: number,
  }[]
}
export interface UserInfo {
  id: string;
  name: string;
  iat: string;
}

