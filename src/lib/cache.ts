import { getCombinedNodeFlags } from 'typescript';
import { IListing } from './database';

let listingsCache: IListing[] = [

];
let polling = false;
let pollBufferTime = 0;
let paginationKey: any = null;
let cdn: any = null;

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
    }
}

export default cache;