/*TYPES**************************************************************************************************************/
export interface IService {
    _id: string,
    type: string,
    text_1: string,
    text_2: string,
    text_3: string,
    text_4: string,
    text_5: string,
    image: string,
    createdAt: Date
}

/*STATE**************************************************************************************************************/

export interface INITIALSTATE_SERVICES {
    services: IService[] | null,
};

/*ACTION**************************************************************************************************************/

export enum TYPES_SERVICES {
    SERVICES_FIND = "SERVICES_FIND",
    SERVICES_UPDATE = "SERVICES_UPDATE",
    SERVICES_CREATE = "SERVICES_CREATE",
    SERVICES_REMOVE = "SERVICES_REMOVE",
};

interface Find {
    type: TYPES_SERVICES.SERVICES_FIND,
    payload: IService[]
};

interface Create {
    type: TYPES_SERVICES.SERVICES_CREATE,
    payload: IService
};

interface Update {
    type: TYPES_SERVICES.SERVICES_UPDATE,
    payload: IService
};

interface Remove {
    type: TYPES_SERVICES.SERVICES_REMOVE,
    payload: IService
};

export type ACTIONS_SERVICES = Find | Create | Update | Remove;