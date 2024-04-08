export interface Order {
    id?: number,
    clientId: number,
    Products?: object[],
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