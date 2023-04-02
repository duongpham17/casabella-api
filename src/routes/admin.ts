import express, {IRouter} from 'express';
import { protect, restrictTo  } from '../controller/authentication';
import { get_users, update_users, get_prices, update_prices, create_prices, delete_prices } from '../controller/admin'

const router: IRouter = express.Router();

router.use(protect, restrictTo("admin"));

router.get('/users', get_users);
router.post('/users', update_users);

router.get('/prices', get_prices);
router.post('/prices', create_prices);
router.patch('/prices', update_prices);
router.delete('/prices/:id', delete_prices);

export default router;