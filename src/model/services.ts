import {Schema, model, Document} from 'mongoose';

export interface IServices extends Document {
    type: string,
    text_1: string,
    text_2: string,
    text_3: string,
    text_4: string,
    text_5: string,
    image: string,
    createdAt: Date
};

const servicesSchema = new Schema<IServices>({
    type: {
        type: String,
    },
    text_1: {
        type: String,
    },
    text_2: {
        type: String,
    },
    text_3: {
        type: String,
    },
    text_4: {
        type: String,
    },
    text_5: {
        type: String,
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date
    },
});

export default model<IServices>('Services', servicesSchema);