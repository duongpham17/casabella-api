import { ACTIONS_SERVICES, TYPES_SERVICES, INITIALSTATE_SERVICES } from '@redux/types/services';

const initialState: INITIALSTATE_SERVICES = {
    services: null,
};

export const services = (state = initialState, action: ACTIONS_SERVICES) => {
    const {type, payload} = action;

    switch(type){
        case TYPES_SERVICES.SERVICES_FIND:
            return{
                ...state,
                services: payload
            };  
        case TYPES_SERVICES.SERVICES_UPDATE:
            return{
                ...state,
                services: state.services ? state.services.map(el => el._id === payload._id ? payload: el) : [payload]
            };  
        case TYPES_SERVICES.SERVICES_CREATE:
            return{
                ...state,
                services: state.services ? [payload, ...state.services] : [payload]
            };
        case TYPES_SERVICES.SERVICES_REMOVE:
            return{
                ...state,
                services: state.services ? state.services.filter(el => payload._id !== el._id) : []
            };

        default: 
            return state;
    }
}

export default services;