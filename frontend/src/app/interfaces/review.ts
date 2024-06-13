export interface Review {
    score: number,
    comment: string,
    ProductId?: number,
    ClientId?: string,
    createdAt?: string,
    updatedAt?: string,
    Client?: {
        createdAt?: string,
        updatedAt?: string,
        Person: {
            id: number | bigint | string,
            firstName: string,
            secondName?: string,
            lastName1: string,
            lastName2?: string,
            photoUrl?: string
        }
    }
}

export interface Msg {
    message: string, 
    text?: string, 
    forUser?: boolean
}