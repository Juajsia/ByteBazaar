export interface Wishlist {
    id: number,
    clientId: number | bigint | string,
    Products?: object[],
    createdAt?: string,
    updatedAt?: string
}

export interface WishlistProduct {
    WishlistId: number,
    ProductId: number,
    createdAt?: string,
    updatedAt?: string
}