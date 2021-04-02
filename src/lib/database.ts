import cache from './cache';

export interface IListing {
    id: string,
    title: string,
    price: number,
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
    description: string,
    likes?: number,
    details?: {
        stones?: {
            stone: string,
            color?: string
        }[],
        chakras?: string[];
        benefits?: string[];
    },
    options?: {}
}


export async function getAllListings(descending: boolean = false, limit?: number): Promise<IListing[]> {
    let limitParam = limit ? limit : '';

    cache.isPolling(true);

    return fetch(`/api/allproducts?descending=${descending}&limit=${limitParam}&paginationIdx=${cache.getPaginationIdx()}`)
        .then(response => {
            return response.json();
        })
        .then(json => {
            cache.isPolling(false);
            cache.setPollBuffer(200);
            // Parse data
            cache.setPaginationIdx(json.paginationIdx);

            let data: IListing[] = json.listings;
            return data;
        })
}

export async function getProductById(id: string): Promise<IProduct> {
    let response = await fetch(`/api/product?id=${id}`);
    let json = await response.json();
    // Parse data
    let data: IProduct = json;
    return data;
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