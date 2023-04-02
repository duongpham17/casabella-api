import { combineReducers } from '@reduxjs/toolkit';

import alert from './alert';
import authentication from './authentication';
import user from './user';
import admin from './admin';

const reducers = combineReducers({
    alert,
    authentication,
    user,
    admin
});

export default reducers;