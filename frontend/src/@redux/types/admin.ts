/*TYPES**************************************************************************************************************/
import {IUser} from './user';
import {IPrice} from './prices';
import {IService} from './services';
import {IReview} from './reviews';

/*STATE**************************************************************************************************************/

export interface ResponseType {
    [key: string]: string
};

export interface INITIALSTATE_ADMIN {
    users: IUser[] | null,
    prices: IPrice[] | null,
    services: IService[] | null,
    reviews: IReview[] | null
    status: ResponseType,
    errors: ResponseType,
};

export type UserObjectKeys = keyof INITIALSTATE_ADMIN

/*ACTION**************************************************************************************************************/

export enum TYPES_ADMIN {
    ADMIN_USERS_GET = "ADMIN_USERS_GET",
    ADMIN_USERS_UPDATE = "ADMIN_USERS_UPDATE",

    ADMIN_PRICES_GET = "ADMIN_PRICES_GET",
    ADMIN_PRICES_UPDATE = "ADMIN_PRICES_UPDATE",
    ADMIN_PRICES_CREATE = "ADMIN_PRICES_CREATE",
    ADMIN_PRICES_DELETE = "ADMIN_PRICES_DELETE",

    ADMIN_SERVICES_GET = "ADMIN_SERVICES_GET",
    ADMIN_SERVICES_UPDATE = "ADMIN_SERVICES_UPDATE",
    ADMIN_SERVICES_CREATE = "ADMIN_SERVICES_CREATE",
    ADMIN_SERVICES_DELETE = "ADMIN_SERVICES_DELETE",

    ADMIN_REVIEWS_GET = "ADMIN_REVIEWS_GET",
    ADMIN_REVIEWS_UPDATE = "ADMIN_REVIEWS_UPDATE",
    ADMIN_REVIEWS_CREATE = "ADMIN_REVIEWS_CREATE",
    ADMIN_REVIEWS_DELETE = "ADMIN_REVIEWS_DELETE",

    ADMIN_RESPONSE_STATUS = "ADMIN_RESPONSE_STATUS",
    ADMIN_RESPONSE_ERROR  = "ADMIN_RESPONSE_ERROR",
    ADMIN_RESPONSE_CLEAR  = "ADMIN_RESPONSE_CLEAR",
    ADMIN_STATE_CLEAR     = "ADMIN_STATE_CLEAR",
};

interface Users_Get {
    type: TYPES_ADMIN.ADMIN_USERS_GET,
    payload: IUser[]
};

interface Users_Update {
    type: TYPES_ADMIN.ADMIN_USERS_UPDATE,
    payload: IUser
};

interface Prices_Get {
    type: TYPES_ADMIN.ADMIN_PRICES_GET,
    payload: IPrice[]
};

interface Prices_Update {
    type: TYPES_ADMIN.ADMIN_PRICES_UPDATE,
    payload: IPrice
};

interface Prices_Delete {
    type: TYPES_ADMIN.ADMIN_PRICES_DELETE,
    payload: IPrice
};

interface Prices_Create {
    type: TYPES_ADMIN.ADMIN_PRICES_CREATE,
    payload: IPrice
};

interface Services_Get {
    type: TYPES_ADMIN.ADMIN_SERVICES_GET,
    payload: IService[]
};

interface Services_Update {
    type: TYPES_ADMIN.ADMIN_SERVICES_UPDATE,
    payload: IService
};

interface Services_Delete {
    type: TYPES_ADMIN.ADMIN_SERVICES_DELETE,
    payload: IService
};

interface Services_Create {
    type: TYPES_ADMIN.ADMIN_SERVICES_CREATE,
    payload: IService
};

interface Reviews_Get {
    type: TYPES_ADMIN.ADMIN_REVIEWS_GET,
    payload: IReview[]
};

interface Reviews_Update {
    type: TYPES_ADMIN.ADMIN_REVIEWS_UPDATE,
    payload: IReview
};

interface Reviews_Delete {
    type: TYPES_ADMIN.ADMIN_REVIEWS_DELETE,
    payload: IReview
};

interface Reviews_Create {
    type: TYPES_ADMIN.ADMIN_REVIEWS_CREATE,
    payload: IReview
};

interface Response_Status {
    type: TYPES_ADMIN.ADMIN_RESPONSE_STATUS,
    payload: ResponseType
};

interface Response_Error {
    type: TYPES_ADMIN.ADMIN_RESPONSE_ERROR,
    payload: ResponseType
};

interface Response_Clear {
    type: TYPES_ADMIN.ADMIN_RESPONSE_CLEAR
    payload?: string
};

interface State_Clear {
    type: TYPES_ADMIN.ADMIN_STATE_CLEAR,
    payload: {
        key: UserObjectKeys,
        value: any
    }
};

export type ACTION_ADMIN = 
    Users_Get | Users_Update | 
    Prices_Get | Prices_Create | Prices_Delete | Prices_Update | 
    Services_Get | Services_Create | Services_Delete | Services_Update | 
    Reviews_Get | Reviews_Create | Reviews_Delete | Reviews_Update | 
    Response_Error | Response_Status | Response_Clear | State_Clear