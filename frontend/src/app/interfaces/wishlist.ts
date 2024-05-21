export interface Wishlist {
    id: number,
    clientId: number,
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