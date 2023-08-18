import { api } from '@redux/api';
import { Dispatch } from 'redux';
import { ACTIONS_SERVICES, IService, TYPES_SERVICES } from '@redux/types/services';

const find = (filter: string) => async (dispatch: Dispatch<ACTIONS_SERVICES>) => {
    try{
        const res = await api.get(`/services/${filter}`);
        dispatch({
            type: TYPES_SERVICES.SERVICES_FIND,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const create = (data: any) => async (dispatch: Dispatch<ACTIONS_SERVICES>) => {
    try{
        const res = await api.post(`/services`, data);
        dispatch({
            type: TYPES_SERVICES.SERVICES_CREATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const update = (data: IService) => async (dispatch: Dispatch<ACTIONS_SERVICES>) => {
    try{
        const res = await api.patch(`/services`, data);
        dispatch({
            type: TYPES_SERVICES.SERVICES_UPDATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log(error.response)
        console.log("Please reload")
    }
};

const remove = (data: IService) => async (dispatch: Dispatch<ACTIONS_SERVICES>) => {
    try{
        const res = await api.delete(`/services/${data._id}`);
        dispatch({
            type: TYPES_SERVICES.SERVICES_REMOVE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log(error.response)
        console.log("Please reload")
    }
};

const Admin = {
    find,
    create,
    update,
    remove,
}

export default Admin