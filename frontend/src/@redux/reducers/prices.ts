import { ACTIONS_PRICES, TYPES_PRICES, INITIALSTATE_PRICES } from '@redux/types/prices';

const initialState: INITIALSTATE_PRICES = {
    prices: null,
};

export const admin = (state = initialState, action: ACTIONS_PRICES) => {
    const {type, payload} = action;

    switch(type){
        case TYPES_PRICES.PRICES_FIND:
            return{
                ...state,
                prices: payload
            };  
        case TYPES_PRICES.PRICES_UPDATE:
            return{
                ...state,
                prices: state.prices ? state.prices.map(el => el._id === payload._id ? payload: el) : [payload]
            }; 
        case TYPES_PRICES.PRICES_CREATE:
            return{
                ...state,
                prices: state.prices ? [payload, ...state.prices] : [payload]
            };
        case TYPES_PRICES.PRICES_REMOVE:
            return{
                ...state,
                prices: state.prices ? state.prices.filter(el => payload._id !== el._id) : []
            };

        default: 
            return state;
    }
}

export default admin;