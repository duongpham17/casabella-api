import express, {IRouter} from 'express';

import { protect, restrictTo } from '../controller/authentication';
import { find, create, update, remove } from '../controller/prices';

const router: IRouter = express.Router();

router.get('/', find);

router.use(protect, restrictTo("admin"));
router.post('/', create);
router.patch('/', update);
router.delete('/:id', remove);

export default router;