import { injectable, inject } from 'inversify';
import * as Z from 'zod';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';
import RabbitMQServer from '@common/infra/rabbitmq';
import MessageBrokerConfig from '@config/MessageBrokerConfig';

import ICRMProvider from '@common/providers/CRMProvider/repositories/ICRMProvider';

import CreateDealValidator from '@modules/deals/infra/http/validators/CreateDealValidator';

import CreateDealResponse from '@common/providers/CRMProvider/responses/CreateDealResponse';

type IRequest = {
  data: Z.infer<typeof CreateDealValidator>;
}

@injectable()
class RegisterDealService {

  @inject(Types.CRMProvider)
  private CRMProvider: ICRMProvider;

  public async execute({ data }: IRequest): Promise<CreateDealResponse> {

    const response = await this.CRMProvider.createOrg({ name: data.org }).then(async (orgRes) => this.CRMProvider.createDeal({
      org_id: orgRes.data.id,
      title: data.title,
      value: data.value,
      status: data.status,
    }));

    if (!response) throw new AppError('Could not create deal', 500);

    if (response.data.status === 'won') {
      // msg to business manager
      const msg = Buffer.from(JSON.stringify({
        dealId: response.data.id,
        org: data.org,
        title: data.title,
        value: data.value,
      }));

      // send task via rabbitmq
      RabbitMQServer.publish(
        MessageBrokerConfig.rabbitmq.journey.exchanges.primary,
        MessageBrokerConfig.rabbitmq.journey.routingKeys.won,
        msg,
        { messageId: `${response.data.id}` },
      );
    }

    return response;
  }
}

export default RegisterDealService;
