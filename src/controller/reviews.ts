import { NextFunction, Response } from 'express';
import { asyncBlock, appError } from '../@utils/helper';
import { InjectUserToRequest } from '../@types/models';

import Reviews from '../model/reviews';

export const find = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const reviews = await Reviews.find().sort({createdAt: -1});

    if(!reviews) return next(new appError('cannot update reviews data', 401));

    res.status(201).json({
        status: "success",
        data: reviews
    });
});

export const create = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const reviews = await Reviews.create({...req.body, createdAt: new Date()});

    if(!reviews) return next(new appError('cannot update reviews data', 401));

    res.status(201).json({
        status: "success",
        data: reviews
    });
});

export const update = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const reviews = await Reviews.findByIdAndUpdate(req.body._id, req.body, {new: true});

    if(!reviews) return next(new appError('cannot update reviews data', 401));

    res.status(201).json({
        status: "success",
        data: reviews
    });
});

export const remove = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const reviews = await Reviews.findByIdAndDelete(req.params.id);

    if(!reviews) return next(new appError('cannot update reviews data', 401));

    res.status(201).json({
        status: "success",
        data: reviews
    });
});