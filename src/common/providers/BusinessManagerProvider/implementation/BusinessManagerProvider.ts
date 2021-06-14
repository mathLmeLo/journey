import { injectable } from 'inversify';
import axios from 'axios';
import xml2js from 'xml2js';

import AppError from '@common/errors/AppError';
import BusinessManagerConfig from '@config/BlingConfig';

import IBusinessManagerProvider from '@common/providers/BusinessManagerProvider/repositories/IBusinessManagerProvider';

import CreateOrderDTO from '@common/providers/BusinessManagerProvider/dtos/CreateOrderDTO';
import CreateProductDTO from '@common/providers/BusinessManagerProvider/dtos/CreateProductDTO';
import GetOrdersFiltersDTO from '@common/providers/BusinessManagerProvider/dtos/GetOrdersFiltersDTO';

import CreateProductResponse from '@common/providers/BusinessManagerProvider/responses/CreateProductResponse';
import CreateOrderResponse from '@common/providers/BusinessManagerProvider/responses/CreateOrderResponse';

@injectable()
class BusinessManagerProvider implements IBusinessManagerProvider {
  private businessManagerApi = axios.create({ baseURL: BusinessManagerConfig.baseUrl });

  public async createOrder(data: CreateOrderDTO): Promise<CreateOrderResponse> {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(data);
    return this.businessManagerApi.post('/pedido/json', null, { params: { apikey: BusinessManagerConfig.token, xml } })
      .then((res) => res.data)
      .catch((res) => { throw new AppError('Could not create order', res.response.status); });
  }

  public async createProduct(data: CreateProductDTO): Promise<CreateProductResponse> {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(data);
    return this.businessManagerApi.post('/produto/json', null, { params: { apikey: BusinessManagerConfig.token, xml } })
      .then((res) => res.data)
      .catch((res) => { throw new AppError('Could not create product', res.response.status); });
  }

  public async getOrders(filter: GetOrdersFiltersDTO): Promise<object[]> {
    return this.businessManagerApi.get('/pedidos/json', { params: { apikey: BusinessManagerConfig.token, ...filter } })
      .then((res) => res.data)
      .catch((res) => { throw new AppError('Could not search for deals', res.response.status); });
  }

}

export default BusinessManagerProvider;
