const RegisterDeal = {
  tags: ['Deal'],
  description: 'Registers a Deal',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            org: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
            status: {
              type: 'string',
            },
          },
          required: ['org', 'title', 'value', 'status'],
        },
        example: {
          org: 'org_name',
          title: 'deal_name',
          value: '1.0',
          status: 'won',
        },
      },
    },
    required: true,
  },
  operationId: 'RegisterDeal',
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    201: {
      description: 'Deal created',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
              },
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                  },
                },
              },
            },
          },
        },
      },
    },
    400: {
      description: 'Problem on the request body',
    },
  },
};

export default RegisterDeal;
