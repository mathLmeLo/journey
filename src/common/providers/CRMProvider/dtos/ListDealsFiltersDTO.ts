/* eslint-disable camelcase */
interface ListDealsFiltersDTO {
  user_id?: number;
  filter_id?: number;
  stage_id?: number;
  status?: string;
  start?: number;
  limit?: number;
  sort?: string;
  owned_by_you?: number;
}

export default ListDealsFiltersDTO;
