import { injectable, inject } from 'inversify';
import * as Z from 'zod';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import IBusinessManagerProvider from '@common/providers/BusinessManagerProvider/repositories/IBusinessManagerProvider';

import CreateOrderValidator from '@modules/orders/infra/http/validators/CreateOrderValidator';

// import CreateDealResponse from '@common/providers/BusinessManagerProvider/responses/CreateDealResponse';

type IRequest = {
  data: Z.infer<typeof CreateOrderValidator>;
}

@injectable()
class CreateOrderService {

  @inject(Types.BusinessManagerProvider)
  private BusinessManagerProvider: IBusinessManagerProvider;

  public async execute({ data }: IRequest): Promise<object> {

    const response = await this.BusinessManagerProvider.createOrder({
      pedido: {
        cliente: { nome: data.cliente },
        itens: {
          item: [{
            descricao: data.item,
            vlr_unit: Number(data.valor),
          }],
        },
      },
    });
    if (!response) throw new AppError('Could not create order', 500);

    return response;
  }
}

export default CreateOrderService;
