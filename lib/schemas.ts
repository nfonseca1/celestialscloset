export interface IProduct {
    id: string,
    title: string,
    price: number,
    photos: {
        link: string,
        crop?: { x: number, y: number }
    }[],
    date: number,
    description: string,
    likes?: number,
    active?: number,
    details?: {
        stones?: {
            stone: string,
            color?: string
        }[],
        chakras?: string[],
        benefits?: string[]
    },
    options?: {}
}

export interface IUser {
    id: string,
    email?: string,
    passwordHash: string,
    firstname: string,
    lastname: string,
    username: string,
    likedProducts?: string[],
    isAdmin: boolean,
    options?: {}
}

export interface IComment {
    productId: string,
    userId: string,
    author: string,
    comment: string
}