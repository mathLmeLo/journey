const GetOrder = {
  tags: ['Order'],
  description: 'Gets all orders aggregating by day',
  operationId: 'GetOrder',
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Orders',
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
        },
      },
    },
  },
};

export default GetOrder;
