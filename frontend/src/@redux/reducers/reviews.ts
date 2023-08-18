import { ACTIONS_REVIEWS, TYPES_REVIEWS, INITIALSTATE_REVIEWS } from '@redux/types/reviews';

const initialState: INITIALSTATE_REVIEWS = {
    reviews: null,
};

export const services = (state = initialState, action: ACTIONS_REVIEWS) => {
    const {type, payload} = action;

    switch(type){
        case TYPES_REVIEWS.REVIEWS_FIND:
            return{
                ...state,
                reviews: payload
            };  
        case TYPES_REVIEWS.REVIEWS_UPDATE:
            return{
                ...state,
                reviews: state.reviews ? state.reviews.map(el => el._id === payload._id ? payload: el) : [payload]
            };  
        case TYPES_REVIEWS.REVIEWS_CREATE:
            return{
                ...state,
                reviews: state.reviews ? [payload, ...state.reviews] : [payload]
            };
        case TYPES_REVIEWS.REVIEWS_REMOVE:
            return{
                ...state,
                reviews: state.reviews ? state.reviews.filter(el => payload._id !== el._id) : []
            };

        default: 
            return state;
    }
}

export default services;