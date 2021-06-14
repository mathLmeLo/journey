import { injectable } from 'inversify';
import FormData from 'form-data';
import axios from 'axios';

import AppError from '@common/errors/AppError';
import CRMConfig from '@config/PipedriveConfig';

import ICRMProvider from '@common/providers/CRMProvider/repositories/ICRMProvider';

import ICreateDealDTO from '@common/providers/CRMProvider/dtos/ICreateDealDTO';
import ICreateOrgDTO from '@common/providers/CRMProvider/dtos/ICreateOrgDTO';
import SearchDealsFiltersDTO from '@common/providers/CRMProvider/dtos/SearchDealsFiltersDTO';
import ListDealsFiltersDTO from '@common/providers/CRMProvider/dtos/ListDealsFiltersDTO';

import CreateOrgResponse from '@common/providers/CRMProvider/responses/CreateOrgResponse';
import CreateDealResponse from '@common/providers/CRMProvider/responses/CreateDealResponse';
import SearchDealResponse from '@common/providers/CRMProvider/responses/SearchDealResponse';
import ListDealsResponse from '@common/providers/CRMProvider/responses/ListDealsResponse';

@injectable()
class CRMProvider implements ICRMProvider {
  private CRMApi = axios.create({ baseURL: CRMConfig.baseUrl });

  public async createOrg(org: ICreateOrgDTO): Promise<CreateOrgResponse> {
    const form = new FormData();
    Object.keys(org).forEach((key) => form.append(key, org[key]));

    return this.CRMApi.post('/organizations', form, {
      params: { api_token: CRMConfig.token },
      headers: { ...form.getHeaders() },
    })
      .then((res) => res.data)
      .catch((res) => { throw new AppError('Could not create org', res.response.status); });
  }

  public async createDeal(deal: ICreateDealDTO): Promise<CreateDealResponse> {
    const form = new FormData();
    Object.keys(deal).forEach((key) => form.append(key, deal[key]));

    return this.CRMApi.post('/deals', form, {
      params: { api_token: CRMConfig.token },
      headers: { ...form.getHeaders() },
    })
      .then((res) => res.data)
      .catch((res) => { throw new AppError('Could not create deal', res.response.status); });
  }

  public async searchDeals(filter: SearchDealsFiltersDTO): Promise<SearchDealResponse> {
    return this.CRMApi.get('/deals/search', { params: { api_token: CRMConfig.token, ...filter } })
      .then((res) => res.data)
      .catch((res) => { throw new AppError('Could not search for deals', res.response.status); });
  }

  public async listDeals(filter: ListDealsFiltersDTO): Promise<ListDealsResponse> {
    return this.CRMApi.get('/deals', { params: { api_token: CRMConfig.token, ...filter } })
      .then((res) => res.data)
      .catch((res) => { throw new AppError('Could not get deals', res.response.status); });
  }

}

export default CRMProvider;
