import { injectable } from 'inversify';
import axios from 'axios';
import xml2js from 'xml2js';

import AppError from '@common/errors/AppError';
import BusinessManagerConfig from '@config/BlingConfig';

import IBusinessManagerProvider from '@common/providers/BusinessManagerProvider/repositories/IBusinessManagerProvider';
import CreateOrderDTO from '@common/providers/BusinessManagerProvider/dtos/CreateOrderDTO';
import GetOrdersFiltersDTO from '@common/providers/BusinessManagerProvider/dtos/GetOrdersFiltersDTO';

@injectable()
class BusinessManagerProvider implements IBusinessManagerProvider {
  private businessManagerApi = axios.create({ baseURL: BusinessManagerConfig.baseUrl });

  public async createOrder(data: CreateOrderDTO): Promise<Object> {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(data);
    console.log(xml); // REMOVER
    return this.businessManagerApi.post('/pedido/json', null, { params: { apikey: BusinessManagerConfig.token, xml } })
      .then((res) => res.data)
      .catch((res) => { throw new AppError('Could not create user Record in keycloak database', res.response.status); });
  }

  public async getOrders(filter: GetOrdersFiltersDTO): Promise<Object[]> {
    return this.businessManagerApi.get('/pedidos/json', { params: { apikey: BusinessManagerConfig.token, ...filter } })
      .then((res) => res.data)
      .catch((res) => { throw new AppError('Could not search for deals', res.response.status); });
  }

}

export default BusinessManagerProvider;
