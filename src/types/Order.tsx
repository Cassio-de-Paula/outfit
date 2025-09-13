import { Size } from "./Product";

export interface ProductOrder {
    id: string
    name: string
    price: number
    quantity: number
    color?: string[]
    size?: Size
    imageUrl?: string
}

export interface Order {
    id?: string
    userId: string
    items: ProductOrder[]
    total: number
    createdAt: Date
}