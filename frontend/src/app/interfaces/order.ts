import { Product } from "./product"

export interface Order {
    id?: number,
    clientId: string,
    Products?: Product[],
    createdAt?: string,
    updatedAt?: string,
    total: number
}

export interface CartProduct {
    OrderId: number,
    ProductId: number,
    quantity?: number,
    createdAt?: string,
    updatedAt?: string
}

export interface OrderDetail {

    quantity: number,
    createdAt: string,
    updatedAt: string,
    OrderId: number,
    ProductId: number
}