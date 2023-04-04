import { NextFunction, Response } from 'express';
import { asyncBlock, appError } from '../@utils/helper';
import { InjectUserToRequest } from '../@types/models';

import Reviews from '../model/reviews';

export const reviews = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const reviews = await Reviews.find().sort({createdAt: -1});

    if(!reviews) return next(new appError('cannot find any reviews', 401));

    res.status(201).json({
        status: "success",
        data: reviews
    });
});