import { ACTIONS_USER, TYPES_USER, INITIALSTATE_USER } from '@redux/types/user';

const initialState: INITIALSTATE_USER = {
    user: null,
    users: null,
    status: {},
    errors: {},
};

export const user = (state = initialState, action: ACTIONS_USER) => {
    const {type, payload} = action;

    switch(type){
        case TYPES_USER.USER_LOGIN:
            return{
                ...state,
                user: payload
            };  
        case TYPES_USER.USER_FIND:
            return{
                ...state,
                users: payload
            };  
        case TYPES_USER.USER_UPDATE:
            return{
                ...state,
                users: state.users ? state.users.map(el => el._id === payload._id ? payload: el) : [payload]
            };  
        case TYPES_USER.USER_RESPONSE_STATUS:
            return{
                ...state,
                status: payload
            };
        case TYPES_USER.USER_RESPONSE_ERROR:
            return{
                ...state,
                errors: payload
            }
        case TYPES_USER.USER_RESPONSE_CLEAR:
            return{
                ...state,
                status: {},
                errors: {}
            }
        case TYPES_USER.USER_STATE_CLEAR:
            return{
                ...state,
                [payload.key]: payload.value
            }

        default: 
            return state;
    }
}

export default user;