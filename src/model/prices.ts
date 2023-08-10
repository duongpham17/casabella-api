import {Schema, model, Document} from 'mongoose';

export interface IPricesSubsets {
    id: string,
    title: string,
    type: "price" | "bulk",
    bulk_discount: number,
    items: {
        subsetId: string,
        id: string,
        name: string,
        price: number,
        description: string,
        discount: number,
        bulk_price: number,
        bulk_discount: boolean,
    }[]
}

export interface IPrices extends Document {
    title: string,
    subsets: IPricesSubsets[],
    createdAt: Date
};

const pricesSchema = new Schema<IPrices>({
    title: {
        type: String,
    },
    subsets: [
        
    ],
    createdAt: {
        type: Date,
        default: new Date
    },
});

export default model<IPrices>('Prices', pricesSchema);