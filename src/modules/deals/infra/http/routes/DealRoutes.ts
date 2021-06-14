import { Router } from 'express';

import DealController from '@modules/deals/infra/http/controllers/DealController';

const dealRouter = Router();
const dealController = new DealController();

dealRouter.post('/', dealController.create);
dealRouter.post('/publish/won', dealController.publish);

export default dealRouter;
