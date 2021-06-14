const CreateOrder = {
  tags: ['Order'],
  description: 'Creates a Order',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            cliente: {
              type: 'string',
            },
            item: {
              type: 'string',
            },
            valor: {
              type: 'string',
            },
          },
          required: ['cliente', 'item', 'valor'],
        },
        example: {
          cliente: 'org_name',
          item: 'deal_name',
          valor: '22.50',
        },
      },
    },
    required: true,
  },
  operationId: 'CreateOrder',
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    201: {
      description: 'Order created',
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

export default CreateOrder;
