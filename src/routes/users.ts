import express, {IRouter} from 'express';

import { protect, restrictTo } from '../controller/authentication';
import { find, update } from '../controller/users';

const router: IRouter = express.Router();

router.get('/', find);

router.use(protect, restrictTo("admin"));
router.patch('/', update);

export default router;