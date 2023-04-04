import {Schema, model, Document} from 'mongoose';

export interface IReviews extends Document {
    title: string,
    review: string,
    stars: number,
    createdAt: Date,
};

const reviewsSchema = new Schema<IReviews>({
    title: {
        type: String,
    },
    review: {
        type: String,
    },
    stars: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: new Date
    },
});

export default model<IReviews>('Reviews', reviewsSchema);