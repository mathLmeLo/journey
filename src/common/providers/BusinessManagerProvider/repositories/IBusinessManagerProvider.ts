import CreateOrderDTO from '@common/providers/BusinessManagerProvider/dtos/CreateOrderDTO';
import CreateProductDTO from '@common/providers/BusinessManagerProvider/dtos/CreateProductDTO';
import GetOrdersFiltersDTO from '@common/providers/BusinessManagerProvider/dtos/GetOrdersFiltersDTO';

import CreateProductResponse from '@common/providers/BusinessManagerProvider/responses/CreateProductResponse';
import CreateOrderResponse from '@common/providers/BusinessManagerProvider/responses/CreateOrderResponse';

interface IBusinessManagerProvider {
  createProduct(order: CreateProductDTO): Promise<CreateProductResponse>
  createOrder(order: CreateOrderDTO): Promise<CreateOrderResponse>
  getOrders(filter: GetOrdersFiltersDTO): Promise<object>
}

export default IBusinessManagerProvider;
