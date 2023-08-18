/*TYPES**************************************************************************************************************/
export interface IReview {
    _id: string,
    title: string,
    review: string,
    stars: number,
    createdAt: Date
}

/*STATE**************************************************************************************************************/

export interface INITIALSTATE_REVIEWS {
    reviews: IReview[] | null
};

/*ACTION**************************************************************************************************************/

export enum TYPES_REVIEWS {
    REVIEWS_FIND = "REVIEWS_FIND",
    REVIEWS_UPDATE = "REVIEWS_UPDATE",
    REVIEWS_CREATE = "REVIEWS_CREATE",
    REVIEWS_REMOVE = "REVIEWS_REMOVE",
};


interface Find {
    type: TYPES_REVIEWS.REVIEWS_FIND,
    payload: IReview[]
};

interface Create {
    type: TYPES_REVIEWS.REVIEWS_CREATE,
    payload: IReview
};

interface Update {
    type: TYPES_REVIEWS.REVIEWS_UPDATE,
    payload: IReview
};

interface Remove {
    type: TYPES_REVIEWS.REVIEWS_REMOVE,
    payload: IReview
};

export type ACTIONS_REVIEWS = Find | Create | Update | Remove;