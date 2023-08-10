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

/*ACTION**************************************************************************************************************/