import ICreateDealDTO from '@common/providers/CRMProvider/dtos/ICreateDealDTO';
import ICreateOrgDTO from '@common/providers/CRMProvider/dtos/ICreateOrgDTO';
import SearchDealsFiltersDTO from '@common/providers/CRMProvider/dtos/SearchDealsFiltersDTO';
import ListDealsFiltersDTO from '@common/providers/CRMProvider/dtos/ListDealsFiltersDTO';

import CreateOrgResponse from '@common/providers/CRMProvider/responses/CreateOrgResponse';
import CreateDealResponse from '@common/providers/CRMProvider/responses/CreateDealResponse';
import SearchDealResponse from '@common/providers/CRMProvider/responses/SearchDealResponse';
import ListDealsResponse from '@common/providers/CRMProvider/responses/ListDealsResponse';

interface ICRMProvider {
  createOrg(org: ICreateOrgDTO): Promise<CreateOrgResponse>;
  createDeal(deal: ICreateDealDTO): Promise<CreateDealResponse>;
  listDeals(filter: ListDealsFiltersDTO): Promise<ListDealsResponse>;
  searchDeals(filter: SearchDealsFiltersDTO): Promise<SearchDealResponse>;
}

export default ICRMProvider;
