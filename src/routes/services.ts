import express, {IRouter} from 'express';

import { protect, restrictTo } from '../controller/authentication';
import { create, find, update, remove } from '../controller/services';

const router: IRouter = express.Router();

router.get('/:filter', find);

router.use(protect, restrictTo("admin"));
router.post('/', create)
router.patch('/', update);
router.delete('/:id', remove);

export default router;