import express, {IRouter} from 'express';
import { reviews } from '../controller/reviews';
const router: IRouter = express.Router();

router.get('/', reviews);

export default router;