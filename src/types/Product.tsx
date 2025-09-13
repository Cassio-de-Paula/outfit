export type Size = 'S' | 'M' | 'X' | 'XL' | 'XXL' | number

export interface Review {
    rate: number
    message: string | null | undefined
}

export interface Image {
    colors: string[] | null,
    url: string
}

export interface Product {
    id?: string
    name: string
    inStock: boolean
    price: number
    images: Image[]
    category: 'Perfume' | 'Trousers' | 'Handbag' | 'Hat' | 'Shoe' | 'Thermos'
    details: string
    sizes: Size[]
    onOffer: boolean
    orders: number
    reviews: Review[]
}