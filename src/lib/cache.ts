import { IListing } from './database';

let listingsCache: IListing[] = [

];
let polling = false;
let pollBufferTime = 0;
let paginationIdx = 0;

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

    getPaginationIdx: () => {
        return paginationIdx;
    },
    setPaginationIdx: (idx: number) => {
        paginationIdx = idx;
    }
}

export default cache;