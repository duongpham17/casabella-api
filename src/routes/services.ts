import express, {IRouter} from 'express';
import { services } from '../controller/services';
const router: IRouter = express.Router();

router.get('/', services);

export default router;