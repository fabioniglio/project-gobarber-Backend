import { Router } from 'express';

import ensuredAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensuredAuthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
