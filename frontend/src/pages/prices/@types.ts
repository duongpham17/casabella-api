import React from 'react';
import { IPrice } from '@redux/types/prices';

export interface CreateProps {
    setData: React.Dispatch<React.SetStateAction<IPrice>>,
    data: IPrice
}

export interface EditProps {
    setData: React.Dispatch<React.SetStateAction<IPrice>>,
    data: IPrice
}

export interface ActionsProps {
    setData: React.Dispatch<React.SetStateAction<IPrice>>,
    data: IPrice
}