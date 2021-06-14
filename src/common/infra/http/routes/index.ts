import { Router } from 'express';

import DealRoutes from '@modules/deals/infra/http/routes/DealRoutes';
import OrderRoutes from '@modules/orders/infra/http/routes/OrderRoutes';

const routes = Router();

routes.use('/deals', DealRoutes);
routes.use('/orders', OrderRoutes);

export default routes;
