/* eslint-disable camelcase */
interface SearchDealsFiltersDTO {
  term: string;
  status: string;
  fields?: string;
  exact_match?: string;
  person_id?: string;
  organization_id?: string;
  include_fields?: string;
  start?: string;
  limit?: string;
}

export default SearchDealsFiltersDTO;
