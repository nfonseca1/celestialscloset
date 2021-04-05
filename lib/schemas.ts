import { Request } from 'express';
import { Session } from 'express-session';

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

export interface IRequest extends Request {
    session: any
}

export interface IProductInfoList {
    title: string,
    price: number,
    description: string,
    stones: string[],
    chakras: string[],
    benefits: string[],
    inactive?: boolean,
    hideStones?: boolean,
    hideChakras?: boolean,
    hideBenefits?: boolean
}