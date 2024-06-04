export interface Review {
    score: number,
    comment: string,
    ProductId: number,
    createdAt?: string,
    updatedAt?: string,
    Client: {
        createdAt?: string,
        updatedAt?: string,
        Person: {
            id: number | bigint | string,
            firstName: string,
            secondName?: string,
            lastName1: string,
            lastName2?: string
          }
    }
}