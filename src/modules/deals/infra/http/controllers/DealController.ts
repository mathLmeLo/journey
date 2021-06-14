import { Request, Response } from 'express';

import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';

import RegisterDealService from '@modules/deals/services/RegisterDealService';
import FindWonAndPublish from '@modules/deals/services/FindWonAndPublish';

import CreateDealValidator from '@modules/deals/infra/http/validators/CreateDealValidator';

class DealController {

  public async create(req: Request, res: Response): Promise<Response> {

    const data = req.body;

    const validation = CreateDealValidator.check(data);
    if (!validation) throw new AppError('Request body invalid', 400);

    const createdeals = AppContainer.resolve<RegisterDealService>(RegisterDealService);
    const result = await createdeals.execute({ data });

    return res.status(201).json(result);
  }

  public async publish(req: Request, res: Response): Promise<Response> {

    const publishWon = AppContainer.resolve<FindWonAndPublish>(FindWonAndPublish);
    await publishWon.execute();

    return res.status(204).json();
  }
}

export default DealController;
