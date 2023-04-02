import { ACTION_ADMIN, TYPES_ADMIN, INITIALSTATE_ADMIN } from '@redux/types/admin';

const initialState: INITIALSTATE_ADMIN = {
    users: null,
    prices: null,
    status: {},
    errors: {},
};

export const admin = (state = initialState, action: ACTION_ADMIN) => {
    const {type, payload} = action;

    switch(type){
        case TYPES_ADMIN.ADMIN_USERS_GET:
            return{
                ...state,
                users: payload
            }  
        case TYPES_ADMIN.ADMIN_USERS_UPDATE:
            return{
                ...state,
                users: state.users ? state.users.map(el => el._id === payload._id ? payload: el) : [payload]
            }  
        case TYPES_ADMIN.ADMIN_PRICES_GET:
            return{
                ...state,
                prices: payload
            }  
        case TYPES_ADMIN.ADMIN_PRICES_UPDATE:
            return{
                ...state,
                prices: state.prices ? state.prices.map(el => el._id === payload._id ? payload: el) : [payload]
            }  
        case TYPES_ADMIN.ADMIN_PRICES_CREATE:
            return{
                ...state,
                prices: state.prices ? [payload, ...state.prices] : [payload]
            };
        case TYPES_ADMIN.ADMIN_PRICES_DELETE:
            return{
                ...state,
                prices: state.prices ? state.prices.filter(el => payload._id !== el._id) : []
            }
        case TYPES_ADMIN.ADMIN_RESPONSE_STATUS:
            return{
                ...state,
                status: payload
            };
        case TYPES_ADMIN.ADMIN_RESPONSE_ERROR:
            return{
                ...state,
                errors: payload
            }
        case TYPES_ADMIN.ADMIN_RESPONSE_CLEAR:
            return{
                ...state,
                status: {},
                errors: {}
            }
        case TYPES_ADMIN.ADMIN_STATE_CLEAR:
            return{
                ...state,
                [payload.key]: payload.value
            }

        default: 
            return state;
    }
}

export default admin;