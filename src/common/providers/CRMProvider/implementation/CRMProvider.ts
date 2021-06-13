import { injectable } from 'inversify';
import axios from 'axios';

import AppError from '@common/errors/AppError';
import CRMConfig from '@config/PipedriveConfig';

import ICRMProvider from '@common/providers/CRMProvider/repositories/ICRMProvider';
import SearchDealsFiltersDTO from '@common/providers/CRMProvider/dtos/SearchDealsFiltersDTO';

@injectable()
class CRMProvider implements ICRMProvider {
  private CRMApi = axios.create({ baseURL: CRMConfig.baseUrl });

  public async searchDeals(filter: SearchDealsFiltersDTO): Promise<Object[]> {
    return this.CRMApi.get('/deals/search', { params: { api_token: CRMConfig.token, ...filter } })
      .then((res) => res.data)
      .catch((res) => { throw new AppError('Could not search for deals', res.response.status); });
  }

}

export default CRMProvider;
