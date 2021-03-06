import cache from './cache';

export interface IListing {
    id: string,
    title: string,
    price?: number,
    isActive: string,
    photos: {
        link: string,
        crop?: {
            x: number,
            y: number
        }
    }[],
    date: number
}

export interface IProduct extends IListing {
    description?: string,
    likes?: number,
    details?: {
        stones?: {
            stone: string,
            color?: string
        }[],
        chakras?: string[];
        benefits?: string[];
    },
    options?: {
        hideStones?: boolean,
        hideChakras?: boolean,
        hideBenefits?: boolean
    }
}


export async function getAllListings(descending: boolean = false, limit?: number, inActive: boolean = false): Promise<IListing[]> {
    let limitParam = limit ? limit : '';
    // No more listings to load
    if (cache.getPaginationKey() === undefined) return [];

    cache.isPolling(true);

    return fetch(`/api/allproducts?descending=${descending}&limit=${limitParam}&paginationKey=${cache.getPaginationKey()}&inActive=${inActive}`)
        .then(response => {
            return response.json();
        })
        .then(json => {
            cache.isPolling(false);
            cache.setPollBuffer(200);

            cache.setPaginationKey(json.paginationKey);
            cache.setCDN(json.CDN);

            let data: IListing[] = json.listings;
            return data;
        })
}

export async function getProductById(id: string): Promise<IProduct> {
    let response = await fetch(`/api/product?id=${id}`);
    let json = await response.json();
    cache.setCDN(json.CDN);
    let data: IProduct = json.data;
    return data;
}

type PaymentSettings = {
    stripeEnabled: null | boolean,
    paypalEnabled: null | boolean
}
export async function getPaymentSettings(): Promise<PaymentSettings> {
    return fetch("/api/paymentSettings")
        .then(res => res.json())
        .then((data: PaymentSettings) => {
            cache.setPayments(data);
            return data;
        })
}

interface CartItem {
    thumbnailUrl: string,
    title: string,
    price: number,
    quantity: number
}
interface Cart {
    [id: string]: CartItem
}
export function addToCart(id: string, data: CartItem) {
    fetch('/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, data })
    })
    cache.addToCart(id, data)
}

export function getListItems(): Promise<{ stones: string[], benefits: string[] }> {
    return fetch(`/admin/lists/`)
        .then(res => res.json())
}

export function getAllInstagramPosts(limit?: number): string[] {
    return instagramPosts.slice(0, limit);
}

const instagramPosts = [
    'https://www.instagram.com/p/CNBZa74Hkpi/',
    'https://www.instagram.com/p/CM-kUnXnClE/',
    'https://www.instagram.com/p/CM9-s1onpIv/',
    'https://www.instagram.com/p/CM91AZ_nz03/',
    'https://www.instagram.com/p/CM9yOJPHnt_/',
    'https://www.instagram.com/p/CM9w7c-nOCa/',
    'https://www.instagram.com/p/CM9vrRUHNQl/',
    'https://www.instagram.com/p/CM8nOcCn-Fa/',
    'https://www.instagram.com/p/CM8kVVonyV1/'
]