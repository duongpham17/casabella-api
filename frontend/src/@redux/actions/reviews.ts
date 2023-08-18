import { api } from '@redux/api';
import { Dispatch } from 'redux';
import { ACTIONS_REVIEWS, TYPES_REVIEWS, IReview } from '@redux/types/reviews';

const find = () => async (dispatch: Dispatch<ACTIONS_REVIEWS>) => {
    try{
        const res = await api.get(`/reviews`);
        dispatch({
            type: TYPES_REVIEWS.REVIEWS_FIND,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const create = (data: Partial<IReview>) => async (dispatch: Dispatch<ACTIONS_REVIEWS>) => {
    try{
        const res = await api.post(`/reviews`, data);
        dispatch({
            type: TYPES_REVIEWS.REVIEWS_CREATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const update = (data: IReview) => async (dispatch: Dispatch<ACTIONS_REVIEWS>) => {
    try{
        const res = await api.patch(`/reviews`, data);
        dispatch({
            type: TYPES_REVIEWS.REVIEWS_UPDATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log(error.response)
        console.log("Please reload")
    }
};

const remove = (data: IReview) => async (dispatch: Dispatch<ACTIONS_REVIEWS>) => {
    try{
        const res = await api.delete(`/reviews/${data._id}`);
        dispatch({
            type: TYPES_REVIEWS.REVIEWS_REMOVE,
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