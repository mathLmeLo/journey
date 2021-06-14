/* eslint-disable camelcase */
interface ICreateDealDTO {
  title: string;
  org_id: number;
  value?: string;
  currency?: string;
  user_id?: number;
  person_id?: number;
  stage_id?: number;
  status?: string;
  expected_close_date?: Date;
  probability?: string;
  lost_reason?: string;
  visible_to?: string;
  add_time?: string;
}

export default ICreateDealDTO;
