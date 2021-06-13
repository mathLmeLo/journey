import SearchDealsFiltersDTO from '@common/providers/CRMProvider/dtos/SearchDealsFiltersDTO';

interface ICRMProvider {
  searchDeals(filter: SearchDealsFiltersDTO): Promise<Object[]>
}

export default ICRMProvider;
