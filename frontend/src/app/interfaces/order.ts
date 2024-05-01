import { Product } from "./product"

export interface Order {
    id?: number,
    clientId: number,
    Products?: object[] | Product[],
    createdAt?: string,
    updatedAt?: string
}

export interface CartProduct {
    OrderId: number,
    ProductId: number,
    quantity?: number,
    createdAt?: string,
    updatedAt?: string
}