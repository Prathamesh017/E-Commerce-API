export interface responseInterface {
  message: string;
  data: String[] | Product[]
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
