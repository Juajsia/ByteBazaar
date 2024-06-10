export interface Client {
    id: number | bigint | string,
    firstName: string,
    secondName?: string,
    lastName1: string,
    photoUrl?: string,
    lastName2?: string | null,
    email: string,
    password: string,
    createdAt?: string,
    updatedAt?: string
}