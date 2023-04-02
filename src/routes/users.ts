import express, {IRouter} from 'express';

import { protect } from '../controller/authentication';

const router: IRouter = express.Router();

router.use(protect);


export default router;