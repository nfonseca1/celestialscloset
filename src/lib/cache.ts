import { IListing } from './database';

interface ICartItem {
    thumbnailUrl: string,
    title: string,
    price: number,
    quantity: number
}

let listingsCache: IListing[] = [

];
let cart: {
    [id: string]: ICartItem
} = {

};
let polling = false;
let pollBufferTime = 0;
let paginationKey: any = null;
let cdn: any = null;

type PaymentSettings = {
    stripeEnabled: null | boolean,
    paypalEnabled: null | boolean
}
let payments: PaymentSettings = {
    stripeEnabled: null,
    paypalEnabled: null
}

let cache = {
    getCache: () => {
        return listingsCache;
    },
    setCache: (data?: IListing[]) => {
        if (data) listingsCache = data;
    },
    addToCache: (data?: IListing[]) => {
        if (data) listingsCache.push(...data);
    },
    getCart: () => {
        return cart;
    },
    addToCart: (id: string, data: ICartItem) => {
        cart[id] = data;
    },
    removeFromCart: (id: string) => {
        delete cart[id];
    },
    getPollBuffer: () => {
        return pollBufferTime;
    },
    setPollBuffer: (time: number) => {
        pollBufferTime = Date.now() + time;
    },
    isPolling: (is?: boolean) => {
        if (is !== undefined) polling = is;
        return polling;
    },

    getPaginationKey: () => {
        return JSON.stringify(paginationKey);
    },
    setPaginationKey: (key: any) => {
        paginationKey = key;
    },

    getCDN: () => {
        return cdn;
    },
    setCDN: (CDN: string) => {
        cdn = CDN;
    },

    getPayments: () => {
        return payments;
    },
    setPayments: (paymentSettings: PaymentSettings) => {
        payments = paymentSettings
    }
}

export default cache;