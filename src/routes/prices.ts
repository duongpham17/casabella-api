import express, {IRouter} from 'express';
import { prices } from '../controller/prices';
const router: IRouter = express.Router();

router.get('/', prices);

export default router;