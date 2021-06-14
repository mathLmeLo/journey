import { injectable, inject } from 'inversify';
import * as Z from 'zod';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import IBusinessManagerProvider from '@common/providers/BusinessManagerProvider/repositories/IBusinessManagerProvider';

import CreateOrderValidator from '@modules/orders/infra/http/validators/CreateOrderValidator';

import CreateOrderResponse from '@common/providers/BusinessManagerProvider/responses/CreateOrderResponse';

type IRequest = {
  data: Z.infer<typeof CreateOrderValidator>;
}

@injectable()
class CreateOrderService {

  @inject(Types.BusinessManagerProvider)
  private BusinessManagerProvider: IBusinessManagerProvider;

  public async execute({ data }: IRequest): Promise<CreateOrderResponse> {

    const response = await this.BusinessManagerProvider.createProduct({ produto: { descricao: data.item, codigo: 'PAPSS8P128' } })
      .then((productRes) => this.BusinessManagerProvider.createOrder({
        pedido: {
          cliente: { nome: data.cliente },
          itens: {
            item: [{
              codigo: productRes.retorno.produtos[0].produto.codigo,
              descricao: data.item,
              vlr_unit: Number(data.valor),
            }],
          },
        },
      }));

    // console.log('#order response:');
    // console.log(JSON.stringify(response, null, 4));
    if (!response) throw new AppError('Could not create order', 500);

    return response;
  }
}

export default CreateOrderService;
