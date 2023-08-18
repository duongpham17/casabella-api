import { api } from '@redux/api';
import { Dispatch } from 'redux';
import { ACTIONS_PRICES, TYPES_PRICES } from '@redux/types/prices';
import { IPrice } from '@redux/types/prices';

const find = () => async (dispatch: Dispatch<ACTIONS_PRICES>) => {
    try{
        const res = await api.get(`/prices`);
        dispatch({
            type: TYPES_PRICES.PRICES_FIND,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const create = (data: any) => async (dispatch: Dispatch<ACTIONS_PRICES>) => {
    try{
        const res = await api.post(`/prices`, data);
        dispatch({
            type: TYPES_PRICES.PRICES_CREATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const update = (data: IPrice) => async (dispatch: Dispatch<ACTIONS_PRICES>) => {
    try{
        const res = await api.patch(`/prices`, data);
        dispatch({
            type: TYPES_PRICES.PRICES_UPDATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log(error.response)
        console.log("Please reload")
    }
};

const remove = (data: IPrice) => async (dispatch: Dispatch<ACTIONS_PRICES>) => {
    try{
        const res = await api.delete(`/prices/${data._id}`);
        dispatch({
            type: TYPES_PRICES.PRICES_REMOVE,
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