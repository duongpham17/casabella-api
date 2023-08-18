import { api } from '@redux/api';
import { Dispatch } from 'redux';
import { ACTIONS_USER, TYPES_USER, IUser, UserObjectKeys } from '@redux/types/user';

const find = () => async (dispatch: Dispatch<ACTIONS_USER>) => {
    try{
        const res = await api.get(`/users`);
        dispatch({
            type: TYPES_USER.USER_FIND,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const update = (data: IUser) => async (dispatch: Dispatch<ACTIONS_USER>) => {
    try{
        const res = await api.patch(`/users`, data);
        dispatch({
            type: TYPES_USER.USER_UPDATE,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const state_clear = (key:UserObjectKeys, value: any) => async (dispatch: Dispatch<ACTIONS_USER>) => {
    dispatch({
        type: TYPES_USER.USER_STATE_CLEAR,
        payload: { key, value }
    });
};

const User = {
    update,
    find,
    state_clear
};

export default User;