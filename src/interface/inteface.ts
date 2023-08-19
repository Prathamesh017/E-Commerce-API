export interface responseInterface {
  message: string;
  data: [] | String[] | Product[] | Cart[] | Order[] | GetOrders
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
  items: Item[]
}
export interface UserInfo {
  id: string;
  name: string;
  iat: string;
}
export interface Item {
  productId: string,
  quantity: number,
}

export interface Order {
  id: string;
  userId: string
  cartId: string
  totalPrice: number
  orderNumber: string
  products: Product[]
}

export interface GetOrders {
  cartId: string;
  userId: string;
  orders: {
    id: string;
    totalPrice: number
    orderNumber: string
    products: Product[]
  }[]
}
