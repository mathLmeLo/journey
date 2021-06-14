import { Router } from 'express';

import DealRoutes from '@modules/deals/infra/http/routes/DealRoutes';

const routes = Router();

routes.use('/deals', DealRoutes);

export default routes;
