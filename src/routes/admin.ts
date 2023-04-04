import express, {IRouter} from 'express';
import { protect, restrictTo  } from '../controller/authentication';

import { 
    get_users, update_users, 
    get_prices, update_prices, create_prices, delete_prices, 
    get_services, update_services, create_services, delete_services,
    get_reviews, update_reviews, create_reviews, delete_reviews  
} from '../controller/admin';

const router: IRouter = express.Router();

router.use(protect, restrictTo("admin"));

router.get('/users', get_users);
router.post('/users', update_users);

router.get('/prices', get_prices);
router.post('/prices', create_prices);
router.patch('/prices', update_prices);
router.delete('/prices/:id', delete_prices);

router.get('/services', get_services);
router.post('/services', create_services)
router.patch('/services', update_services);
router.delete('/services/:id', delete_services);

router.get('/reviews', get_reviews);
router.post('/reviews', create_reviews)
router.patch('/reviews', update_reviews);
router.delete('/reviews/:id', delete_reviews);

export default router;