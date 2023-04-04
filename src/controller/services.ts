import { NextFunction, Response } from 'express';
import { asyncBlock, appError } from '../@utils/helper';
import { InjectUserToRequest } from '../@types/models';

import Services from '../model/services';

export const services = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const services = await Services.find().sort({createdAt: -1});

    if(!services) return next(new appError('cannot find any services', 401));

    res.status(201).json({
        status: "success",
        data: services
    });
});