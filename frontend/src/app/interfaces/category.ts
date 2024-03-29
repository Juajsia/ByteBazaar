export interface Category {
    id: number,
    name: string,
    description: string,
    Products?: object,
    createdAt?: string,
    updatedAt?: string
}

export interface Platform {
    id: number,
    name: string,
}