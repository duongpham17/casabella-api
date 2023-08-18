import { NextFunction, Response } from 'express';
import { asyncBlock, appError } from '../@utils/helper';
import { InjectUserToRequest } from '../@types/models';

import Services from '../model/services';

export const find = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const filter = Object.assign({}, ...req.params.filter.split(",").map(el => ({[el.split("=")[0]]: el.split("=")[1]})));

    let data: any;

    if(filter){
        data = await Services.find(filter).sort({createdAt: -1});
    } else {
        data = await Services.find().sort({createdAt: -1});
    }

    if(!data) return next(new appError('cannot find any services', 401));

    res.status(201).json({
        status: "success",
        data
    });
});

export const create = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const services = await Services.create({...req.body, createdAt: new Date()});

    if(!services) return next(new appError('cannot update services data', 401));

    res.status(201).json({
        status: "success",
        data: services
    });
});

export const update = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const services = await Services.findByIdAndUpdate(req.body._id, req.body, {new: true});

    if(!services) return next(new appError('cannot update services data', 401));

    res.status(201).json({
        status: "success",
        data: services
    });
});

export const remove = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const services = await Services.findByIdAndDelete(req.params.id);

    if(!services) return next(new appError('cannot update services data', 401));

    res.status(201).json({
        status: "success",
        data: services
    });
});
