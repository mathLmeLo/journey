import { injectable, inject } from 'inversify';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';
import RabbitMQServer from '@common/infra/rabbitmq';
import MessageBrokerConfig from '@config/MessageBrokerConfig';

import ICRMProvider from '@common/providers/CRMProvider/repositories/ICRMProvider';

import Order from '@modules/orders/infra/mongoose/models/Order';

@injectable()
class FindWonAndPublish {

  @inject(Types.CRMProvider)
  private CRMProvider: ICRMProvider;

  public async execute(): Promise<void> {

    const deals = await this.CRMProvider.listDeals({ status: 'won' });
    if (!deals) throw new AppError('Could not get deals', 500);

    if (deals.data.length > 0) {
      deals.data.map((deal) => {
        // Search in Mongo first for dealId, if is not there, then publish
        Order.findOne({ dealId: `${deal.id}` }, (err, order) => {
          if (!order) {
            // msg to business manager
            const msg = Buffer.from(JSON.stringify({
              dealId: deal.id,
              org: deal.org_name,
              title: deal.title,
              value: deal.value,
            }));

            // send task via rabbitmq
            RabbitMQServer.publish(
              MessageBrokerConfig.rabbitmq.journey.exchanges.primary,
              MessageBrokerConfig.rabbitmq.journey.routingKeys.won,
              msg,
              { messageId: `${deal.id}` },
            );
          }
        });
      });
    }
  }
}

export default FindWonAndPublish;
