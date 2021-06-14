/* eslint-disable camelcase */
interface SearchDealResponse {
  success: true,
  data: {
    items: {
      result_score: number;
      item: {
        id: number;
        type: string;
        title: string;
        value: string;
        currency: string;
        status: string;
        visible_to: number;
        owner: {
          id: number;
        },
        stage: {
          id: number;
          name: string;
        },
        person: string;
        organization: {
          id: number;
          name: string;
          address: string;
        },
        custom_fields: [],
        notes: []
      }
    }[]
  },
  additional_data: {
    pagination: {
      start: number;
      limit: number;
      more_items_in_collection: boolean;
    }
  }
}

export default SearchDealResponse;
