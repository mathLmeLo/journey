import CreateOrderDTO from '@common/providers/BusinessManagerProvider/dtos/CreateOrderDTO';
import GetOrdersFiltersDTO from '@common/providers/BusinessManagerProvider/dtos/GetOrdersFiltersDTO';

interface IBusinessManagerProvider {
  createOrder(order: CreateOrderDTO): Promise<object>
  getOrders(filter: GetOrdersFiltersDTO): Promise<object>
}

export default IBusinessManagerProvider;
