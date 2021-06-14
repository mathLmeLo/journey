import { injectable } from 'inversify';

// import AppError from '@common/errors/AppError';

import Order from '@modules/orders/infra/mongoose/models/Order';
import console from 'console';

@injectable()
class GetAggregateService {

  public async execute(): Promise<object[]> {

    const aggregate = await Order.aggregate(
      [
        { $match: {} },
        { $project: {
          day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          value: '$value',
        } },
        { $group: { _id: '$day', total: { $sum: '$value' } } },
      ],
    ).catch((err) => console.log(err));

    return aggregate as object[];
  }
}

export default GetAggregateService;
