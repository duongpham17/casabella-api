import { combineReducers } from '@reduxjs/toolkit';

import alert from './alert';
import authentication from './authentication';
import user from './user';
import services from './services';
import prices from './prices';
import reviews from './reviews';

const reducers = combineReducers({
    alert,
    authentication,
    user,
    prices,
    services,
    reviews
});

export default reducers;