import { NextFunction, Response } from 'express';
import { asyncBlock, appError } from '../@utils/helper';
import { InjectUserToRequest } from '../@types/models';

import Prices from '../model/prices';

export const find = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const prices = await Prices.find().sort({createdAt: -1});

    if(!prices) return next(new appError('cannot find any prices', 401));

    res.status(201).json({
        status: "success",
        data: prices
    });
});

export const create = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const prices = await Prices.create({...req.body, createdAt: new Date()});

    if(!prices) return next(new appError('cannot find any prices', 401));

    res.status(201).json({
        status: "success",
        data: prices
    });
});

export const update = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const prices = await Prices.findByIdAndUpdate(req.body._id, req.body, {new: true});

    if(!prices) return next(new appError('cannot update prices data', 401));

    res.status(201).json({
        status: "success",
        data: prices
    });
});


export const remove = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const prices = await Prices.findByIdAndDelete(req.params.id);

    if(!prices) return next(new appError('cannot update prices data', 401));

    res.status(201).json({
        status: "success",
        data: prices
    });
});
