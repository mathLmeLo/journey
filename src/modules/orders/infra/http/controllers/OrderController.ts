import { Request, Response } from 'express';

import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import GetAggregateService from '@modules/orders/services/GetAggregateService';

import CreateOrderValidator from '@modules/orders/infra/http/validators/CreateOrderValidator';

class OrderController {

  public async create(req: Request, res: Response): Promise<Response> {

    const data = req.body;

    const validation = CreateOrderValidator.check(data);
    if (!validation) throw new AppError('Request body invalid', 400);

    const createOrders = AppContainer.resolve<CreateOrderService>(CreateOrderService);
    const result = await createOrders.execute({ data });

    return res.status(201).json(result);
  }

  public async get(req: Request, res: Response): Promise<Response> {

    const getOrders = AppContainer.resolve<GetAggregateService>(GetAggregateService);
    const result = await getOrders.execute();

    return res.status(200).json(result);
  }
}

export default OrderController;
