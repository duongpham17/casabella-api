import { api } from '@redux/api';
import { Dispatch } from 'redux';
import { ACTION_ADMIN, TYPES_ADMIN } from '@redux/types/admin';
import { IUser } from '@redux/types/user';
import { IPrice } from '@redux/types/prices';

const users = () => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.get(`/admin/users`);
        dispatch({
            type: TYPES_ADMIN.ADMIN_USERS_GET,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const users_update = (data: IUser) => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.post(`/admin/users`, data);
        dispatch({
            type: TYPES_ADMIN.ADMIN_USERS_UPDATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};


const prices = () => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.get(`/admin/prices`);
        dispatch({
            type: TYPES_ADMIN.ADMIN_PRICES_GET,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const prices_create = (data: any) => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.post(`/admin/prices`, data);
        dispatch({
            type: TYPES_ADMIN.ADMIN_PRICES_CREATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const prices_update = (data: IPrice) => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.patch(`/admin/prices`, data);
        dispatch({
            type: TYPES_ADMIN.ADMIN_PRICES_UPDATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log(error.response)
        console.log("Please reload")
    }
};

const prices_delete = (data: IPrice) => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.delete(`/admin/prices/${data._id}`);
        dispatch({
            type: TYPES_ADMIN.ADMIN_PRICES_DELETE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log(error.response)
        console.log("Please reload")
    }
};


const Admin = {
    users,
    users_update,
    prices,
    prices_create,
    prices_update,
    prices_delete
}

export default Admin