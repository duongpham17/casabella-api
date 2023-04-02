import express, {IRouter} from 'express';

import { protect, persist } from '../controller/authentication';

const router: IRouter = express.Router();

router.get('/persist', protect, persist);


export default router;