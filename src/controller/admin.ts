import { NextFunction, Response } from 'express';
import { asyncBlock, appError } from '../@utils/helper';
import { InjectUserToRequest } from '../@types/models';

import User from '../model/users';
import Prices from '../model/prices';
import Services from '../model/services';
import Reviews from '../model/reviews';

// USERS -----------------------------------------------------------------------------------

export const get_users = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const data = await User.find();

    if(!data) return next(new appError('cannot find any users', 401));

    res.status(201).json({
        status: "success",
        data
    });
});

export const update_users = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const user = await User.findByIdAndUpdate(req.body._id, {...req.body}, {new: true});

    if(!user) return next(new appError('cannot update user data', 401));

    res.status(201).json({
        status: "success",
        data: user
    });
});


// PRICES -----------------------------------------------------------------------------------

export const get_prices = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const prices = await Prices.find().sort({createdAt: -1});

    if(!prices) return next(new appError('cannot find any prices', 401));

    res.status(201).json({
        status: "success",
        data: prices
    });
});

export const create_prices = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const prices = await Prices.create({...req.body, createdAt: new Date()});

    if(!prices) return next(new appError('cannot find any prices', 401));

    res.status(201).json({
        status: "success",
        data: prices
    });
});

export const update_prices = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const prices = await Prices.findByIdAndUpdate(req.body._id, req.body, {new: true});

    if(!prices) return next(new appError('cannot update prices data', 401));

    res.status(201).json({
        status: "success",
        data: prices
    });
});


export const delete_prices = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const prices = await Prices.findByIdAndDelete(req.params.id);

    if(!prices) return next(new appError('cannot update prices data', 401));

    res.status(201).json({
        status: "success",
        data: prices
    });
});


// SERVICES -----------------------------------------------------------------------------------

export const get_services = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const services = await Services.find().sort({createdAt: -1});

    if(!services) return next(new appError('cannot update services data', 401));

    res.status(201).json({
        status: "success",
        data: services
    });
});

export const create_services = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const services = await Services.create({...req.body, createdAt: new Date()});

    if(!services) return next(new appError('cannot update services data', 401));

    res.status(201).json({
        status: "success",
        data: services
    });
});

export const update_services = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const services = await Services.findByIdAndUpdate(req.body._id, req.body, {new: true});

    if(!services) return next(new appError('cannot update services data', 401));

    res.status(201).json({
        status: "success",
        data: services
    });
});

export const delete_services = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const services = await Services.findByIdAndDelete(req.params.id);

    if(!services) return next(new appError('cannot update services data', 401));

    res.status(201).json({
        status: "success",
        data: services
    });
});

// REVIEWS -----------------------------------------------------------------------------------

export const get_reviews = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const reviews = await Reviews.find().sort({createdAt: -1});

    if(!reviews) return next(new appError('cannot update reviews data', 401));

    res.status(201).json({
        status: "success",
        data: reviews
    });
});

export const create_reviews = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const reviews = await Reviews.create({...req.body, createdAt: new Date()});

    if(!reviews) return next(new appError('cannot update reviews data', 401));

    res.status(201).json({
        status: "success",
        data: reviews
    });
});

export const update_reviews = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const reviews = await Reviews.findByIdAndUpdate(req.body._id, req.body, {new: true});

    if(!reviews) return next(new appError('cannot update reviews data', 401));

    res.status(201).json({
        status: "success",
        data: reviews
    });
});

export const delete_reviews = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const reviews = await Reviews.findByIdAndDelete(req.params.id);

    if(!reviews) return next(new appError('cannot update reviews data', 401));

    res.status(201).json({
        status: "success",
        data: reviews
    });
});