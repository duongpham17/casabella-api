/*TYPES**************************************************************************************************************/
export interface IPricesItem {
    id: string,
    subsetId: string,
    name: string,
    price: number,
    discount: number,
    bulk_price: number,
    bulk_discount: boolean,
    description: string,
}

export interface IPriceSubsets {
    id: string,
    title: string,
    type: "price" | "bulk",
    bulk_discount: number,
    items:IPricesItem[]
}

export interface IPrice {
    _id: string,
    title: string,
    subsets: IPriceSubsets[],
    createdAt: Date
};

/*STATE**************************************************************************************************************/

export interface INITIALSTATE_PRICES{
    prices: IPrice[] | null,
};

/*ACTION**************************************************************************************************************/

export enum TYPES_PRICES{
    PRICES_FIND = "PRICES_FIND",
    PRICES_UPDATE = "PRICES_UPDATE",
    PRICES_CREATE = "PRICES_CREATE",
    PRICES_REMOVE = "PRICES_REMOVE",
};

interface Find {
    type: TYPES_PRICES.PRICES_FIND,
    payload: IPrice[]
};

interface Update {
    type: TYPES_PRICES.PRICES_UPDATE,
    payload: IPrice
};

interface Remove {
    type: TYPES_PRICES.PRICES_REMOVE,
    payload: IPrice
};

interface Create {
    type: TYPES_PRICES.PRICES_CREATE,
    payload: IPrice
};

export type ACTIONS_PRICES = Find | Update | Remove | Create