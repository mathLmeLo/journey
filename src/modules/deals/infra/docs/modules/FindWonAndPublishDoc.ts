const FindWonAndPublish = {
  tags: ['Deal'],
  description: 'Publishes all "Won" Deals to Database',
  operationId: 'FindWonAndPublish',
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    204: {
      description: 'Deals Published',
    },
  },
};

export default FindWonAndPublish;
