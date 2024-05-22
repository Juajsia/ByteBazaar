import { CartProduct } from "./cart"
import { OrderDetail } from "./order"

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
    quantity?: number,
    ordersnum?: string,
    OrderDetail?: OrderDetail
}

export interface msg {
    message: string
    error: object
}