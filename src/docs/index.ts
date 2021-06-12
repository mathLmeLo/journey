// import * as OrdersDocs from '@modules/orders/infra/docs';

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'REST API Journey',
    version: '1.0.0.',
    description: 'Journey',
    hosts: 'localhost:5555/api',
    contact: {
      name: 'Matheus Melo',
      email: 'math.li.melo@gmail.com',
      url: 'https://www.linkedin.com/in/mathlmelo/',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
};

const options = {
  openapi: swaggerDefinition.openapi,
  info: swaggerDefinition.info,
  servers: [{
    url: 'http://localhost:5555/api/',
    description: 'Local server',
  }],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'BearerAuthtentication',
      },
      BasicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
  },
  tags: [{
    name: 'Order',
    description: 'CRUD para Orders',
  }],
  paths: {
    // Order paths
    // '/orders/': { post: OrderDocs.CreateOrderDoc },
    // '/orders/list': { post: OrderDocs.ListOrderDoc },
    // '/orders/{orig}/{dest}': { get: OrderDocs.FindOrderDoc, patch: OrderDocs.UpdateOrderDoc, delete: OrderDocs.DeleteOrderDoc },
  },
};

export default options;
