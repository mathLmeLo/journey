/* eslint-disable camelcase */
interface CreateOrgResponse {
  success: boolean;
  data: {
    id: number;
    company_id: number;
    owner_id: {
      id: number;
      name: string;
      email: string;
      has_pic: number;
      pic_hash: string;
      active_flag: boolean;
      value: number;
    },
    name: string;
    open_deals_count: number;
    related_open_deals_count: number;
    closed_deals_count: number;
    related_closed_deals_count: number;
    email_messages_count: number;
    people_count: number;
    activities_count: number;
    done_activities_count: number;
    undone_activities_count: number;
    files_count: number;
    notes_count: number;
    followers_count: number;
    won_deals_count: number;
    related_won_deals_count: number;
    lost_deals_count: number;
    related_lost_deals_count: number;
    active_flag: boolean;
    category_id: string;
    picture_id: string;
    country_code: string;
    first_char: string;
    update_time: string;
    add_time: string;
    visible_to: string;
    next_activity_date: string;
    next_activity_time: string;
    next_activity_id: string;
    last_activity_id: string;
    last_activity_date: string;
    label: string;
    address: string;
    address_subpremise: string;
    address_street_number: string;
    address_route: string;
    address_sublocality: string;
    address_locality: string;
    address_admin_area_level_1: string;
    address_admin_area_level_2: string;
    address_country: string;
    address_postal_code: string;
    address_formatted_address: string;
    cc_email: string;
    owner_name: string;
    edit_name: boolean;
  }
}

export default CreateOrgResponse;
