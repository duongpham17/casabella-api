import { NextFunction, Response } from 'express';
import { asyncBlock, appError } from '../@utils/helper';
import { InjectUserToRequest } from '../@types/models';

import Prices from '../model/prices';

export const prices = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const prices = await Prices.find().sort({createdAt: -1});

    if(!prices) return next(new appError('cannot find any prices', 401));

    res.status(201).json({
        status: "success",
        data: prices
    });
});