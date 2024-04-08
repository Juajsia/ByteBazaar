export interface Cart {
    id: number,
    clientId: number,
    Products?: object[],
    createdAt?: string,
    updatedAt?: string
}

export interface CartProduct {
    CartId: number,
    ProductId: number,
    quantity?: number,
    createdAt?: string,
    updatedAt?: string
}