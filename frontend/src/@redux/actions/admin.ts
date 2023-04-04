import { api } from '@redux/api';
import { Dispatch } from 'redux';
import { ACTION_ADMIN, TYPES_ADMIN } from '@redux/types/admin';
import { IUser } from '@redux/types/user';
import { IPrice } from '@redux/types/prices';
import { IService } from '@redux/types/services';
import { IReview } from '@redux/types/reviews';

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

const services = () => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.get(`/admin/services`);
        dispatch({
            type: TYPES_ADMIN.ADMIN_SERVICES_GET,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const services_create = () => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.post(`/admin/services`);
        dispatch({
            type: TYPES_ADMIN.ADMIN_SERVICES_CREATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const services_update = (data: IService) => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.patch(`/admin/services`, data);
        dispatch({
            type: TYPES_ADMIN.ADMIN_SERVICES_UPDATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log(error.response)
        console.log("Please reload")
    }
};

const services_delete = (data: IService) => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.delete(`/admin/services/${data._id}`);
        dispatch({
            type: TYPES_ADMIN.ADMIN_SERVICES_DELETE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log(error.response)
        console.log("Please reload")
    }
};

const reviews = () => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.get(`/admin/reviews`);
        dispatch({
            type: TYPES_ADMIN.ADMIN_REVIEWS_GET,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const reviews_create = (data: Partial<IReview>) => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.post(`/admin/reviews`, data);
        dispatch({
            type: TYPES_ADMIN.ADMIN_REVIEWS_CREATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const reviews_update = (data: IReview) => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.patch(`/admin/reviews`, data);
        dispatch({
            type: TYPES_ADMIN.ADMIN_REVIEWS_UPDATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log(error.response)
        console.log("Please reload")
    }
};

const reviews_delete = (data: IReview) => async (dispatch: Dispatch<ACTION_ADMIN>) => {
    try{
        const res = await api.delete(`/admin/reviews/${data._id}`);
        dispatch({
            type: TYPES_ADMIN.ADMIN_REVIEWS_DELETE,
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
    prices_delete,

    services,
    services_create,
    services_update,
    services_delete,

    reviews,
    reviews_create,
    reviews_update,
    reviews_delete,
}

export default Admin