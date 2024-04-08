import { CartProduct } from "./cart"

export interface Product {
    id?: number,
    name: string,
    stock: number,
    price: number,
    description: string,
    specs: string,
    image: string,
    status?: boolean,
    provider: string,
    categories: string[],
    createdAt?: string,
    updatedAt?: string,
    CartProduct?: CartProduct,
    quantity?: number
}

export interface msg {
    message: string
    error: object
}